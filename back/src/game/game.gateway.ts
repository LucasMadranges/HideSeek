// src/game/game.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {PrismaService} from "../../prisma/prisma.service";

@WebSocketGateway({
    cors: {
        origin: "*", // À configurer selon votre environnement
    },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    private activeGames = new Map<string, Set<string>>(); // gameId -> Set of socketIds

    constructor(private prismaService: PrismaService) {}

    async handleConnection(client: Socket) {
        console.log(`Client connecté: ${client.id}`);
    }

    async handleDisconnect(client: Socket) {
        console.log(`Client déconnecté: ${client.id}`);
        // Retirer le joueur de la partie
        this.removePlayerFromGame(client);
    }

    @SubscribeMessage("createGame")
    async handleCreateGame(client: Socket, payload: {
        zone_localisation: { lng: number; lat: number; radius: number },
        time: string
    }) {
        try {
            // Créer une nouvelle partie dans la base de données
            const newGame = await this.prismaService.games.create({
                data: {
                    zone_localisation: payload.zone_localisation,
                    time: payload.time,
                },
            });

            // Initialiser le Set des joueurs pour cette partie
            this.activeGames.set(newGame.id, new Set([client.id]));

            // Faire rejoindre le client à la room de la partie
            client.join(newGame.id);

            // Informer le client que la partie est créée
            client.emit("gameCreated", newGame);

            return newGame;
        } catch (error) {
            client.emit("error", {message: "Erreur lors de la création de la partie"});
        }
    }

    @SubscribeMessage("joinGame")
    async handleJoinGame(client: Socket, payload: {
        gameId: string,
        position: { lng: number; lat: number }
    }) {
        const {gameId, position} = payload;

        try {
            // Vérifier si la partie existe
            const game = await this.prismaService.games.findUnique({
                where: {id: gameId},
            });

            if (!game) {
                throw new Error("Partie non trouvée");
            }

            // Ajouter le joueur à la liste des joueurs actifs
            const gamePlayers = this.activeGames.get(gameId) || new Set();
            gamePlayers.add(client.id);
            this.activeGames.set(gameId, gamePlayers);

            // Faire rejoindre le client à la room
            client.join(gameId);

            // Informer tous les joueurs de la partie qu'un nouveau joueur a rejoint
            this.server.to(gameId).emit("playerJoined", {
                playerId: client.id,
                position,
            });

            // Envoyer la liste des joueurs actuels au nouveau joueur
            const players = Array.from(gamePlayers).map(playerId => ({
                playerId,
                // Vous devrez maintenir une Map des positions des joueurs
            }));
            client.emit("currentPlayers", players);

        } catch (error) {
            client.emit("error", {message: "Erreur lors de la connexion à la partie"});
        }
    }

    @SubscribeMessage("updatePosition")
    handleUpdatePosition(client: Socket, payload: {
        gameId: string,
        position: { lng: number; lat: number }
    }) {
        const {gameId, position} = payload;

        // Diffuser la nouvelle position à tous les joueurs de la partie
        this.server.to(gameId).emit("playerMoved", {
            playerId: client.id,
            position,
        });
    }

    private removePlayerFromGame(client: Socket) {
        // Parcourir toutes les parties actives pour trouver et retirer le joueur
        this.activeGames.forEach((players, gameId) => {
            if (players.has(client.id)) {
                players.delete(client.id);
                if (players.size === 0) {
                    this.activeGames.delete(gameId);
                }
                // Informer les autres joueurs
                this.server.to(gameId).emit("playerLeft", {playerId: client.id});
            }
        });
    }
}
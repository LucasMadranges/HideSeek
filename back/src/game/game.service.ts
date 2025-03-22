import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {Games} from "@prisma/client";
import {CreateGameDto} from "./models/create-game.dto";
import {UpdateGameDto} from "./models/update-game.dto";

@Injectable()
export class GameService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getGames(): Promise<Games[]> {
        return this.prisma.games.findMany();
    }

    async getGameById(id: string): Promise<Games> {
        return this.prisma.games.findUnique({
            where: {
                id,
            },
        });
    }

    async createGame(data: CreateGameDto): Promise<Games> {
        // Vérifier d'abord si tous les joueurs existent
        const existingPlayers = await this.prisma.players.findMany({
            where: {
                id: {
                    in: data.players,
                },
            },
        });

        if (existingPlayers.length !== data.players.length) {
            throw new Error("Certains joueurs n'existent pas");
        }

        return this.prisma.games.create({
            data: {
                zone_localisation: data.zone_localisation,
                time: data.time,
                players: {
                    createMany: {
                        data: data.players.map(playerId => ({
                            playerId: playerId,
                        })),
                    },
                },
            },
            include: {
                players: {
                    include: {
                        player: true,
                    },
                },
            },
        });
    }

    async updateGame(id: string, data: UpdateGameDto): Promise<Games> {
        return this.prisma.games.update({
            where: {id},
            data: {
                zone_localisation: data.zone_localisation,
                time: data.time,
                players: {
                    create: data.players.map(playerId => ({
                        player: {
                            connect: {id: playerId},
                        },
                    })),
                },
            },
            include: {
                players: {
                    include: {
                        player: true,
                    },
                },
            },
        });
    }

    async deleteGame(id: string): Promise<Games> {
        return this.prisma.games.delete({
            where: {
                id,
            },
        });
    }
}

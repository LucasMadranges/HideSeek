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
        return this.prisma.games.create({
            data: {
                zone_localisation: data.zone_localisation,
                time: data.time,
                players: {
                    connect: data.players.map(id => ({id})),
                },
            },
        });
    }

    async updateGame(id: string, data: UpdateGameDto): Promise<Games> {
        return this.prisma.games.update({
            where: {
                id,
            },
            data: {
                zone_localisation: data.zone_localisation,
                time: data.time,
                players: {
                    connect: data.players.map(id => ({id})),
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

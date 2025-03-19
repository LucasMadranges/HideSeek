import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {GameService} from "./game.service";
import {Games, Users} from "@prisma/client";
import {ApiParam} from "@nestjs/swagger";
import {CreateGameDto} from "./models/create-game.dto";
import {UpdateGameDto} from "./models/update-game.dto";

@Controller("game")
export class GameController {
    constructor(
        private gameService: GameService,
    ) {}

    @Get()
    getGames(): Promise<Games[]> {
        return this.gameService.getGames();
    }

    @Get(":id")
    @ApiParam({
        name: "id",
        type: String,
        description: "ID de la game",
    })
    getGameByid(@Param("id") id: string): Promise<Games> {
        return this.gameService.getGameById(id);
    }

    @Post()
    async createGame(@Body() data: CreateGameDto): Promise<Games> {
        return this.gameService.createGame(data);
    }

    @Put(":id")
    async updateGame(@Param("id") id: string, @Body() updateGameDto: UpdateGameDto): Promise<Games> {
        return this.gameService.updateGame(id, updateGameDto);
    }

    @Delete(":id")
    async deleteGame(@Param("id") id: string): Promise<Games> {
        return this.gameService.deleteGame(id);
    }
}

import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from "@nestjs/common";
import {PartyService} from "./party.service";
import {ApiParam} from "@nestjs/swagger";
import {CreatePartyDto} from "./models/create-party.dto";
import {Users} from "@prisma/client";

@Controller("users")
export class PartyController {
    constructor(
        private usersService: PartyService,
    ) {}

    @Get()
    getUsers(): Promise<Users[]> {
        return this.usersService.getUsers();
    }

    @Get(":id")
    @ApiParam({
        name: "id",
        type: String,
        description: "ID de l'utilisateur",
    })
    getUserById(@Param("id") id: string): Promise<Users> {
        return this.usersService.getUserById(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreatePartyDto): Promise<Users> {
        return this.usersService.createUser(createUserDto);
    }

    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() createUserDto: CreatePartyDto): Promise<Users> {
        return this.usersService.updateUser(id, createUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<Users> {
        return this.usersService.deleteUser(id);
    }
}

import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from "@nestjs/common";
import {UsersService} from "./users.service";
import {users} from "@prisma/client";
import {ApiOperation, ApiParam} from "@nestjs/swagger";
import {CreateUserDto} from "./models/create-user.dto";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {}

    @Get()
    getUsers(): Promise<users[]> {
        return this.usersService.getUsers();
    }

    @Get(":id")
    @ApiParam({
        name: "id",
        type: String,
        description: "ID de l'utilisateur",
    })
    getUserById(@Param("id") id: string): Promise<users> {
        return this.usersService.getUserById(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<users> {
        return this.usersService.createUser(createUserDto);
    }

    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() createUserDto: CreateUserDto): Promise<users> {
        return this.usersService.updateUser(id, createUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<users> {
        return this.usersService.deleteUser(id);
    }
}

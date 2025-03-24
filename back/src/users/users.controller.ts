import {Body, Controller, Delete, Get, Param, Patch, Post, Put, UnauthorizedException } from "@nestjs/common";
import {UsersService} from "./users.service";
import {ApiParam} from "@nestjs/swagger";
import {CreateUserDto} from "./models/create-user.dto";
import {Users} from "@prisma/client";
import {UpdateUserDto} from "./models/update-user.dto";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService,
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

    @Get(":email")
    @ApiParam({
        name: "email",
        type: String,
        description: "Email de l'utilisateur",
    })
    getUserByEmail(@Param("email") email: string): Promise<Users> {
        return this.usersService.getUserByEmail(email);
    }

    @Post()
    async createUser(@Body() data: CreateUserDto): Promise<Users> {
        return this.usersService.createUser(data);
    }

    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: string): Promise<Users> {
        return this.usersService.deleteUser(id);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const user = await this.usersService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Email ou mot de passe incorrect');
        }
        return this.usersService.login(user);
    }
}

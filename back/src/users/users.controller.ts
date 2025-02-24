import {Controller, Get} from "@nestjs/common";
import {UsersService} from "./users.service";
import {users} from "@prisma/client";

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {}
    
    @Get('users')
    getHello(): Promise<users[]> {
        return this.usersService.getUsers();
    }
}

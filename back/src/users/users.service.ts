import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {users} from "@prisma/client";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getUsers(): Promise<users[]> {
        return this.prisma.users.findMany();
    }
}

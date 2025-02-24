import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {users} from "@prisma/client";
import {CreateUserDto} from "./models/create-user.dto";

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
    ) {}

    async getUsers(): Promise<users[]> {
        return this.prisma.users.findMany();
    }

    async getUserById(id: string): Promise<users> {
        return this.prisma.users.findUnique({
            where: {
                id,
            },
        });
    }

    async createUser(data: CreateUserDto): Promise<users> {
        return this.prisma.users.create({data});
    }

    async updateUser(id: string, data: CreateUserDto): Promise<users> {
        return this.prisma.users.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteUser(id: string): Promise<users> {
        return this.prisma.users.delete({
            where: {
                id,
            },
        });
    }
}

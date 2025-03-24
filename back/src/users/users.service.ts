import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {CreateUserDto} from "./models/create-user.dto";
import {Users} from "@prisma/client";
import {UpdateUserDto} from "./models/update-user.dto";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async getUsers(): Promise<Users[]> {
        return this.prisma.users.findMany();
    }

    async getUserById(id: string): Promise<Users> {
        return this.prisma.users.findUnique({
            where: {
                id,
            },
        });
    }

    async getUserByEmail(email: string): Promise<Users> {
        return this.prisma.users.findUnique({
            where: {
                email,
            },
        });
    }

    async createUser(data: CreateUserDto): Promise<Users> {
        return this.prisma.users.create({
            data,
        });
    }

    async updateUser(id: string, data: UpdateUserDto): Promise<Users> {
        return this.prisma.users.update({
            where: {
                id,
            },
            data,
        });
    }

    async deleteUser(id: string): Promise<Users> {
        return this.prisma.users.delete({
            where: {
                id,
            },
        });
    }


    async validateUser(email: string, password: string): Promise<any> {
        const user = this.prisma.users.findUnique({where: {email}});
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}

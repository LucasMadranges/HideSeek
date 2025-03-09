import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {CreatePartyDto} from "./models/create-party.dto";
import {Users} from "@prisma/client";

@Injectable()
export class PartyService {
    constructor(
        private prisma: PrismaService,
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

    async createUser(data: CreatePartyDto): Promise<Users> {
        return this.prisma.users.create({data});
    }

    async updateUser(id: string, data: CreatePartyDto): Promise<Users> {
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
}

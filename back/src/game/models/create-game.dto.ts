import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNotEmpty, IsObject} from "class-validator";
import {Prisma} from "@prisma/client";

export class CreateGameDto {
    @ApiProperty({
        description: "Localisation de la zone de jeu",
        example: {
            lng: 2.3488,
            lat: 48.8534,
            radius: 500,
        },
    })
    @IsObject({message: "La zone de jeu doit être un object"})
    @IsNotEmpty({message: "La zone de jeu est requise"})
    readonly zone_localisation!: Prisma.JsonValue;

    @ApiProperty({
        description: "Temps de jeu",
        example: "30:00",
    })
    @IsString({message: "Le temps de jeu doit être un string"})
    @IsNotEmpty({message: "Le temps de jeu est requis"})
    readonly time!: string;

    @ApiProperty({
        description: "Liste des joueurs",
        example: ["1", "2"],
    })
    @IsString({each: true})
    @IsNotEmpty({message: "La liste des joueurs est requise"})
    readonly players!: string[];
}
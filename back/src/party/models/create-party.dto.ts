import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";

export class CreatePartyDto {

    @ApiProperty({
        description: "Le nom de la partie",
        example: "Partie 1",
    })
    @IsString()
    @IsNotEmpty({message: "Le prénom est requis"})
    readonly name: string;

    @ApiProperty({
        description: "La durée",
        example: 1200,
    })
    @IsString()
    @IsNotEmpty({message: "La durée est requise"})
    readonly duration: number;

    @ApiProperty({
        description: "L'adresse email de l'utilisateur",
        example: "jean.dupont@example.com",
    })
    @IsEmail()
    @IsNotEmpty({message: "L'email est requis"})
    readonly email: string;

    @ApiProperty({
        description: "Le mot de passe de l'utilisateur",
        example: "Azertye789&!",
    })
    @IsStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un symbole.",
    })
    @IsNotEmpty({message: "Le mot de passe est requis"})
    readonly password: string;
}
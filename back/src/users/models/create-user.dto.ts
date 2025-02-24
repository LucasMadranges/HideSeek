import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "Le prénom de l'utilisateur",
        example: "Jean",
    })
    @IsString()
    @IsNotEmpty({message: "Le prénom est requis"})
    readonly firstname: string;

    @ApiProperty({
        description: "Le nom de l'utilisateur",
        example: "Dupont",
    })
    @IsString()
    @IsNotEmpty({message: "Le nom est requis"})
    readonly lastname: string;

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
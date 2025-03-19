import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsString, IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";
import {CreateGameDto} from "./create-game.dto";

export class UpdateGameDto extends PartialType(CreateGameDto) {
}
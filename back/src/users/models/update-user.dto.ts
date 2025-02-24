import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsString, IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";
import {CreateUserDto} from "./create-user.dto";

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
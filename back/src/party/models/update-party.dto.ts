import {ApiProperty, PartialType} from "@nestjs/swagger";
import {IsString, IsEmail, IsNotEmpty, IsStrongPassword} from "class-validator";
import {CreatePartyDto} from "./create-party.dto";

export class UpdatePartyDto extends PartialType(CreatePartyDto) {
}
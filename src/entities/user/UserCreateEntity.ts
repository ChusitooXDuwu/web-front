import Gender from "./GenderEnum";
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  givenName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  lastName!: string;

  @IsDateString()
  birthDate!: Date;

  @IsOptional()
  @IsBoolean()
  isOwner?: boolean;

  @IsEnum(Gender)
  gender!: Gender;

  @IsNumberString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  password!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MaxLength(1000)
  description!: string;

  @IsArray()
  @IsString({ each: true })
  favoriteSportsIds?: string[];
  @IsArray()
  @IsString({ each: true })
  favoriteFieldsIds?: string[];
  @IsArray()
  @IsString({ each: true })
  friendsIds?: string[];
}

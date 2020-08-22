import { UsersService } from "./users.service";
import {
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Body,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import CreateUserDto from "./dto/createUser.dto";
import PostgresErrorCode from "../database/postgresErrorCode.enum";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CreateProfileDto } from "../profile/dto/createProfile.dto";

@ApiBearerAuth()
@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create user" })
  async register(@Body() registrationData: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create({
        ...registrationData,
      });
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          "User with that email already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post("profile")
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create user profile" })
  async createProfile(@Body() post: CreateProfileDto) {
    return this.usersService.createProfile(post);
  }
}

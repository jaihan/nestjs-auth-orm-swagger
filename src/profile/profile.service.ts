import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Profile } from "./profile.entity";
import { CreateProfileDto } from "./dto/createProfile.dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileService: Repository<Profile>
  ) {}

  async createProfile(profile: CreateProfileDto) {
    return await this.profileService.save(profile);
  }
}

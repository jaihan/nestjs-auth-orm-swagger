import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
  @ApiProperty()
  gender: string;

  @ApiProperty()
  photo: string;
}

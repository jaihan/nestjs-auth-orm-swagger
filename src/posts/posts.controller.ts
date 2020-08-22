import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import PostsService from "./posts.service";
import CreatePostDto from "./dto/createPost.dto";
import UpdatePostDto from "./dto/updatePost.dto";
import FindOneParams from "../utils/findOneParams";
import RequestWithUser from "../auth/interface/requestWithUser";
import {
  ApiBasicAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiBasicAuth()
@ApiTags("Posts")
@Controller("posts")
@UseInterceptors(ClassSerializerInterceptor)
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Get all posts" })
  @ApiResponse({ status: 200, description: "[]" })
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: "The found record",
  })
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Create post" })
  async createPost(
    @Body() post: CreatePostDto,
    @Req() req: RequestWithUser
  ): Promise<CreatePostDto> {
    return this.postsService.createPost(post, req.user);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param() { id }: FindOneParams,
    @Body() post: UpdatePostDto
  ) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(Number(id));
  }
}

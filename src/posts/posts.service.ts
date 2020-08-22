import { Injectable } from "@nestjs/common";
import CreatePostDto from "./dto/createPost.dto";
import Post from "./post.entity";
import UpdatePostDto from "./dto/updatePost.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PostNotFoundException from "./exceptions/postNotFound.exception";
import User from "../users/user.entity";

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) {}

  getAllPosts() {
    return this.postsRepository.find({ relations: ["author"] });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id, {
      relations: ["author"],
    });
    if (post) {
      return post;
    }
    throw new PostNotFoundException(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    console.log("create Post:::", post);
    console.log("create Post:::", user);
    const newPost = await this.postsRepository.create({
      ...post,
      author: user,
    });
    await this.postsRepository.save(newPost);
    console.log(newPost);

    return newPost;
  }

  async updatePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id, {
      relations: ["author"],
    });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new PostNotFoundException(id);
    }
  }
}

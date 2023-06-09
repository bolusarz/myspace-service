import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { Post as PostModel, User as UserModel } from "@prisma/client";

@Controller()
export class AppController {
  constructor() {}

  // @Get("post/:id")
  // async getPostById(@Param("id") id: string): Promise<PostModel> {
  //   return this.postService.post({ id: Number(id) });
  // }
  //
  // @Get("feed")
  // async getPublishedPosts(): Promise<PostModel[]> {
  //   return this.postService.posts({
  //     where: { published: true },
  //   });
  // }
  //
  // @Get("filtered-posts/:searchString")
  // async getFilteredPosts(
  //   @Param("searchString") searchString: string
  // ): Promise<PostModel[]> {
  //   return this.postService.posts({
  //     where: {
  //       OR: [
  //         { title: { contains: searchString } },
  //         { content: { contains: searchString } },
  //       ],
  //     },
  //   });
  // }
  //
  // @Post("post")
  // async createDraft(
  //   @Body() postData: { title: string; content?: string; authorEmail: string }
  // ): Promise<PostModel> {
  //   const { title, authorEmail, content } = postData;
  //   return this.postService.createPost({
  //     title,
  //     content,
  //     author: { connect: { email: authorEmail } },
  //   });
  // }
  //
  // @Post("user")
  // async signupUser(
  //   @Body() userData: { name?: string; email: string }
  // ): Promise<UserModel> {
  //   try {
  //     return await this.userService.createUser(userData);
  //   } catch (e) {
  //     console.log(e);
  //     throw new HttpException(`${e}`, HttpStatus.BAD_REQUEST);
  //   }
  // }
  //
  // @Put("publish/:id")
  // async publishPost(@Param("id") id: string): Promise<PostModel> {
  //   return this.postService.updatePost({
  //     where: { id: Number(id) },
  //     data: { published: true },
  //   });
  // }
  //
  // @Delete("post/:id")
  // async deletePost(@Param("id") id: string): Promise<PostModel> {
  //   return this.postService.deletePost({ id: Number(id) });
  // }
}

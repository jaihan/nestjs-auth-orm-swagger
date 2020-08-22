import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AdminUsersModule } from "./adminUsers/admin.users.module";
import { CategoriesModule } from "./categories/categories.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import Post from "./posts/post.entity";
import User from "./users/user.entity";
import Category from "./categories/category.entity";
import Address from "./users/address.entity";
import { Profile } from "./profile/profile.entity";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "amstriker",
      password: "postgres",
      database: "demo1",
      entities: [User, Post, Category, Address, Profile],
      synchronize: true,
    }),
    AuthModule,
    AdminUsersModule,
    PostsModule,
    UsersModule,
    CategoriesModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

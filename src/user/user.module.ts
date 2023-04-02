import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserDBService } from "./userdb.service";
import { PrismaService } from "../prisma.service";

@Module({
  providers: [UserService, UserDBService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}

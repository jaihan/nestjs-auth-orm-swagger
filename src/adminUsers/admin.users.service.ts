import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
export class AdminUsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: "admin",
        password: "admin",
      },
      {
        userId: 2,
        username: "superman",
        password: "superman",
      },
      {
        userId: 3,
        username: "ironman",
        password: "ironman",
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

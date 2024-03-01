import { AxiosResponse } from "axios";
import $api from "../http";
import { IUser } from "../types/auth";

export class UserService {
  static async fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
}

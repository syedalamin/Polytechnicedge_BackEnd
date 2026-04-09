import prismaClient from "../../../config/prismaClient";
import bcrypt from "bcrypt";
import { generateToken } from "../../../lib/generateToken";
import { ApiError } from "../../../errors/apiError";

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

const login = async (data: ILogin): Promise<ILoginResponse> => {
  const user = await prismaClient.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized("Invalid password");
  }

  const token = generateToken({
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  return {
    token,
  };
};

export const authService = {
  login,
};

import { appConfig } from "../../config/appConfig";
import { verifyToken } from "../../lib/generateToken";
import { sendErrorResponse } from "../../Shared/sendErrorResponse";
import httpStatus from "http-status";
const graphqlContext = async ({ req, res }: { req: any; res: any }) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    sendErrorResponse(
      res,
      httpStatus.FORBIDDEN,
      "You are not authorized, please login",
      "UNAUTHORIZED",
    );
  }

  const decoded = verifyToken(token, appConfig.jwt.accessSecret as string);
  if (!decoded) {
    sendErrorResponse(
      res,
      httpStatus.FORBIDDEN,
      "Invalid token",
      "UNAUTHORIZED",
    );
  }

  req.user = decoded;
  return { req, res };
};

export default graphqlContext;

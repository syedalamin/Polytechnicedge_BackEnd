import { verifyToken } from "../../lib/generateToken";
import { sendErrorResponse } from "../../Shared/sendErrorResponse";
import httpStatus from "http-status";
const graphqlContext = async ({ req, res }: { req: any; res: any }) => {
  const token = req.cookies?.token;

  if (!token) {
    sendErrorResponse(
      res,
      httpStatus.FORBIDDEN,
      "You are not authorized, please login",
      "UNAUTHORIZED",
    );
  }

  const decoded = verifyToken(token);
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

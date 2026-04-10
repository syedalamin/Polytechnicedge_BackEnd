import { verifyToken } from "../../lib/generateToken";
import { sendResponse } from "../../Shared/sendResponse";
import httpStatus from "http-status";
const graphqlContext = async ({ req, res }: { req: any; res: any }) => {
  const token = req.cookies?.token;
  
  if (!token) {
    return sendResponse(
      res,
      httpStatus.UNAUTHORIZED,
      "You are now authorized to access this resource, please login",
      null,
    );
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    return sendResponse(res, httpStatus.UNAUTHORIZED, "Invalid token", null);
  }
  req.user = decoded;
  return { req, res };
};

export default graphqlContext;

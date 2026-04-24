 
import { sendErrorResponse } from "../../Shared/sendErrorResponse";
import httpStatus from "http-status";
const graphqlAuth = async (context: any, ...allowedRoles: string[]) => {
  const { req } = context;

  if (!req.user) {
    sendErrorResponse(
      context.res,
      httpStatus.FORBIDDEN,
      "You are not authorized, please login",
      "UNAUTHORIZED",
    );
  }

  const userRole = req.user.role;
  if (!allowedRoles.includes(userRole)) {
    sendErrorResponse(
      context.res,
      httpStatus.FORBIDDEN,
      "You do not have permission to perform this action",
      null,
    );
  } else {
    return true;
  }
};

export default graphqlAuth;

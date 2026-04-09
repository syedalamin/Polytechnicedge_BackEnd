import { sendErrorResponse } from "../../Shared/sendErrorResponse";
 

import httpStatus from "http-status";
const graphqlAuth = async (context: any, ...allowedRoles: string[]) => {
  const { req, res } = context;
  const userRole = req.user.role;
  if (!allowedRoles.includes(userRole)) {
    sendErrorResponse(
      res,
      httpStatus.FORBIDDEN,
      "You do not have permission to access this resource",
      null,
    );
  } else {
    return true;
  }
};

export default graphqlAuth;

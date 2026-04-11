import { graphqlErrorResponse } from "../../Shared/graphqlError";

 

const graphqlAuth = async (context: any, ...allowedRoles: string[]) => {
  const { req } = context;

  if (!req.user) {
   graphqlErrorResponse("You are not authorized, please login", "UNAUTHORIZED");
  }

  const userRole = req.user.role;
  if (!allowedRoles.includes(userRole)) {
    graphqlErrorResponse("You do not have permission to perform this action", "FORBIDDEN");
  }

  return true;
};

export default graphqlAuth;
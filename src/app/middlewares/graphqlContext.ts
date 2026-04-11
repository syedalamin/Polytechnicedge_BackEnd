import { verifyToken } from "../../lib/generateToken";
import { graphqlErrorResponse } from "../../Shared/graphqlError";

const graphqlContext = async ({ req, res }: { req: any; res: any }) => {
  const token = req.cookies?.token;

  if (!token) {
    graphqlErrorResponse(
      "You are not authorized, please login",
      "UNAUTHORIZED",
    );
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    graphqlErrorResponse("Invalid token", "UNAUTHORIZED");
  }

  req.user = decoded;
  return { req, res };
};

export default graphqlContext;

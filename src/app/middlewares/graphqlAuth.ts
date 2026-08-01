import { GraphQLError } from "graphql";

const graphqlAuth = async (context: any, ...allowedRoles: string[]) => {
  const { req } = context;

  if (!req.user) {
    throw new GraphQLError("You are not authorized, please login", {
      extensions: {
        code: "UNAUTHORIZED",
        http: { status: 403 },
      },
    });
  }

  const userRole = req.user.role;
  if (!allowedRoles.includes(userRole)) {
    throw new GraphQLError(
      "You do not have permission to perform this action",
      {
        extensions: {
          code: "FORBIDDEN",
          http: { status: 403 },
        },
      },
    );
  }

  return true;
};

export default graphqlAuth;

export default async function (event: any) {
  // Skip auth for login/register endpoints and public routes
  const publicPaths = [
    "/api/auth/login",
    "/api/auth/register",
    "/api/auth/google",
  ];
  const url = getRequestURL(event);

  if (publicPaths.some((path) => url.pathname.startsWith(path))) {
    return;
  }

  // Check for Authorization header
  const authorization = getHeader(event, "authorization");

  if (!authorization) {
    throw createError({
      statusCode: 401,
      statusMessage: "Authorization header required",
    });
  }

  // Validate token (implement your token validation logic here)
  try {
    const token = authorization.replace("Bearer ", "");
    // Verify token with your auth service
    // const user = await validateToken(token)

    // For now, just check if token exists
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid token",
      });
    }

    // Add user info to event context for use in API routes
    event.context.user = { id: 1, email: "user@example.com" }; // Replace with actual user data
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid or expired token",
    });
  }
}

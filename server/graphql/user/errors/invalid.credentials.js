import { createError } from "apollo-errors";

const InvalidCredentialsError = createError("InvalidCredentialsError", {
    message: "The provided credentials are invalid or incorrect.",
});

const UnauthorizedError = createError("UnauthorizedError", {
    message: "Unauthorized",
});

export { InvalidCredentialsError, UnauthorizedError };

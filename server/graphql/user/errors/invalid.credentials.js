import { createError } from "apollo-errors";

const InvalidCredentialsError = createError("InvalidCredentialsError", {
    message: "The provided credentials are invalid or incorrect.",
});

export { InvalidCredentialsError };

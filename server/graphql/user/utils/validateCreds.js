export default function validateCreds(creds) {
    return (
        creds.username &&
        creds.username.toString().trim() !== "" &&
        /^[a-zA-Z0-9_-]+$/.test(creds.username) &&
        creds.email &&
        creds.email.toString().trim() !== "" &&
        /\S+@\S+\.\S+/.test(creds.email) &&
        creds.password &&
        creds.password.toString().trim() !== "" &&
        creds.password.length > 8
    );
}

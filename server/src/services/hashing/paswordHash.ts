import bcryptjs from "bcryptjs";

export const passwordHash = (password: string) => {
    const saltRounds = 10;
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashed_password = bcryptjs.hashSync(password, salt);
    return hashed_password;
}
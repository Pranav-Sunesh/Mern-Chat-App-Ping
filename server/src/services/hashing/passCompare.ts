import bcryptjs from "bcryptjs";

export const passCompare = (password: string, userPassword: string) => {
    return bcryptjs.compareSync(password, userPassword);
} 
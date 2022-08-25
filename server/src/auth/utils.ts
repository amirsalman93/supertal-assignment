const { compareSync, genSaltSync, hashSync } = require("bcryptjs");

import { v4 as uuidv4 } from 'uuid';

export const generateRandomId = () => {
    return uuidv4();
}

export namespace BcryptHasher {

    export const hashPassword = (password: string): string => {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    export const comparePassword = (
        providedPass: string,
        storedPass: string,
    ): boolean => {
        const passwordIsMatched = compareSync(providedPass, storedPass);
        return passwordIsMatched;
    }
}

import { UserInputError } from "apollo-server-koa";

export function parseTimeStampCursor(strBase64: string) {
    if (strBase64 === "") {
        return new Date(Date.now());
    }

    const strUTF8 = Buffer.from(strBase64, 'base64').toString();
    const timestamp = parseInt(strUTF8);
    if (isNaN(timestamp)) {
        throw new UserInputError(`Invalid timestamp string. base64 = ${strBase64}, utf-8 = ${strUTF8}`);
    }
    return new Date(timestamp);
}

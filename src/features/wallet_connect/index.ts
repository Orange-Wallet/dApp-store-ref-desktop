import UAuth from "@uauth/js";
import { UD_AUTH_KEY, UD_KEY_SCOPE, UD_REDIRECT_URL } from "../../api/constants";
import { setAccount } from "../app/app_slice";

export const uauth = new UAuth({
    clientID: UD_AUTH_KEY ?? "cc720d3c-4eb6-4f04-9b18-9018f5537fff",
    redirectUri: UD_REDIRECT_URL ?? "http://localhost:3000",
    scope: UD_KEY_SCOPE ?? "openid wallet"
});
export const connectWithUd = async () => {
    try {
        const authorization = await uauth.loginWithPopup();
        if (authorization) {
            const user = await uauth.user();
            const address = user.address;
            return address;
        }
        console.log(authorization);
        return undefined;
    } catch (error) {
        console.error(error);
        return undefined;
    }

}
export const logoutUD = async () => {
    try {
        const authorization = await uauth.logout();
        console.log(authorization);
    } catch (error) {
        console.error(error);
    }

}
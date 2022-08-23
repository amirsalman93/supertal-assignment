export namespace LocalStorageService {
    export const loggedInUser = {
        get info() {
            let user: any = localStorage.getItem("loggedInUser");
            if (user) {
                user = JSON.parse(user);
            }
            return user;
        },
        set info(value) {
            localStorage.setItem("loggedInUser", value);
        },
        get username() {
            let user: any = this.info;
            return user && user.username ? `${user.username}` : "";
        },
        get userId() {
            let user: any = this.info;
            let userId = user && user.id;
            return userId ? userId : "";
        },
    };

    export const token = {
        get userToken(): string | undefined {
            return localStorage.getItem("access_token") || undefined;
        },
        set userToken(value: string | undefined) {
            value && localStorage.setItem("access_token", value);
        },
    };

    export function cleanLocalStorage() {
        localStorage.clear();
    }
}

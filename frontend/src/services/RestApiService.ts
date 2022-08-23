import axios from "axios";
import { LocalStorageService } from "./LocalStorageService";
import { ToastService } from "./ToastService";

export type RestApiAction = 'post' | 'get' | 'put' | 'delete';
export namespace RestApiService {

    export function getServerEndpoint() {
        let serverEndpoint = `${window.location.protocol}//${window.location.hostname}:${80}/`;
        if (process.env.NODE_ENV === "production") {
            serverEndpoint = `${window.location.protocol}//${window.location.host}/`;
        }

        return serverEndpoint;
    }

    export function getServerIP() {
        return window.location.host;
    }

    export function callApi(action: RestApiAction, endpoint: string, payload: object, callback: any) {
        let authenticated: boolean = true;
        let config: any = {};
        let userToken = LocalStorageService.token.userToken;
        let domainName = getServerEndpoint();
        if (!config.headers) {
            config["headers"] = {};
        }
        if (authenticated) {
            if (userToken) {
                config["mode"] = "cors";
                config["headers"]["Authorization"] = `${"Bearer " + userToken}`;
            } else {
                // throw 'No token saved!';
            }
        } else {
            config["mode"] = "cors";
        }

        switch (action) {
            case "post":
                {
                    axios.post(domainName + "api/" + endpoint, payload, config)
                        .then(status)
                        .then(data)
                        .then(callback)
                        .catch(handleUnexpectedError)
                }
                break;

            case "get":
                {

                }
                break;

            case "put":
                {

                }
                break;

            case "delete":
                {

                }
                break;

            default:
                break;
        }
    }

    function status(response: any) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            if (response.status === 401) {
                // Unauthorized
                if (window.location.pathname !== "/login") {
                    LocalStorageService.cleanLocalStorage();
                    window.location.assign("/login");
                }
            } else {
            }
            return Promise.reject(response);
        }
    }
    function data(response: any) {
        return response.data;
    }

    function handleUnexpectedError(error: any) {
        if (error && error.response && error.response.data) {
            ToastService.ServerError(error.response.data)
        }
    }

}
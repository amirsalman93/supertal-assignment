import axios from "axios";
import _ from "lodash";
import { LocalStorageService } from "./LocalStorageService";
import { ToastService } from "./ToastService";

export type RestApiAction = 'post' | 'get' | 'getById' | 'put' | 'patch' | 'delete';
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

    export function callApi(action: RestApiAction, endpoint: string, payload: any | string, callback: any) {
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
                    axios.get(domainName + "api/" + endpoint, config)
                        .then(status)
                        .then(data)
                        .then(callback)
                        .catch(handleUnexpectedError)
                }
                break;

            case "getById":
                {
                    axios.get(domainName + "api/" + endpoint + `/${payload}`, config)
                        .then(status)
                        .then(data)
                        .then(callback)
                        .catch(handleUnexpectedError)
                }
                break;

            case "put":
            case "patch":
                {
                    axios.patch(domainName + "api/" + endpoint + `/${payload.id}`, _.omit(payload, 'id'), config)
                        .then(status)
                        .then(data)
                        .then(callback)
                        .catch(handleUnexpectedError)
                }
                break;

            case "delete":
                {
                    // todo
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
                forceLogout();
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
            if (error.response.status === 401) forceLogout();
        }
    }

    function forceLogout() {
        LocalStorageService.cleanLocalStorage();
        // Unauthorized
        if (window.location.pathname !== "/login") {
            window.location.assign("/login");
        }
    }

}
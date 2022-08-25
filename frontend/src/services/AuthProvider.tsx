import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAccessToken, IUser, IUserCredentials } from "../types/users";
import { LocalStorageService } from "./LocalStorageService";
import { RestApiService } from "./RestApiService";
import { getAllPossibleRoutes } from "./RoutesProvider";
import { ToastService } from "./ToastService";

const AuthContext = createContext<{
    user: IUser | null;
    accessToken: string | null;
    login: (loginUser: IUserCredentials) => void;
    logout: () => void;
    alreadyLoggedIn: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);

    const navigate = useNavigate();

    const logout = () => {
        ToastService.Success(`Logging out ...`);
        // redirect to home page
        setTimeout(() => {
            userLoggedOut();
            LocalStorageService.cleanLocalStorage();
            RestApiService.callApi('get', 'users/whoami', {}, () => {
                navigate('/login');
            })
        }, 1000);
    }

    const login = (loginUser: IUserCredentials) => {
        RestApiService.callApi('post', 'users/login', loginUser, (loginRes: IAccessToken) => {
            LocalStorageService.token.userToken = loginRes.access_token;

            ToastService.Success(`Logged in as '${loginRes.user.username}'.`);
            userLoggedIn(loginRes.access_token, loginRes.user);
            // redirect to home page
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        })
    }
    const userLoggedIn = (_accessToken: string, _user: IUser) => {
        setUser(_user);
        setAccessToken(_accessToken);
    }

    const userLoggedOut = () => {
        setUser(null);
        setAccessToken(null);
    }

    const alreadyLoggedIn = () => {
        let token = LocalStorageService.token.userToken;
        if (token) {
            // get user's information is token is available
            RestApiService.callApi('get', 'users/whoami', {}, (user: IUser) => {
                userLoggedIn(token!, user);
                // user was already logged in. and user info has been received. proceed to home
                if (window.location.pathname === '/login' ||
                    window.location.pathname === '/register') {
                    navigate('/home');
                }
            })
        }
        else {
            // user is not logged in. jump to login page
            LocalStorageService.cleanLocalStorage();
            if (window.location.pathname !== '/login' &&
                window.location.pathname !== '/register') {
                navigate('/login');
            }
        }
    }
    useEffect(() => {
        if (!getAllPossibleRoutes().includes(window.location.pathname)) {
            // invalid route
            navigate('/home');
        }
        alreadyLoggedIn();
    }, [])

    return (<AuthContext.Provider value={{ user, accessToken, login, logout, alreadyLoggedIn }}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(AuthContext);
}
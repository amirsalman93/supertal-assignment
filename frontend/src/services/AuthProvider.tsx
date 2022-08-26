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
        }, 1000);
    }

    const login = (loginUser: IUserCredentials) => {
        RestApiService.callApi('post', 'user/login', loginUser, (loginRes: IAccessToken) => {
            ToastService.Success(`Logged in as '${loginRes.user.username}'.`);
            userLoggedIn(loginRes.access_token, loginRes.user);
            // redirect to home page
            setTimeout(() => {
                navigate('/home');
            }, 1000);
        })
    }
    const userLoggedIn = (_accessToken: string, _user: IUser) => {
        !user && setUser(_user);
        !accessToken && setAccessToken(_accessToken);
        LocalStorageService.loggedInUser.info = _user;
        LocalStorageService.token.userToken = _accessToken;
    }

    const userLoggedOut = () => {
        setUser(null);
        setAccessToken(null);
        LocalStorageService.cleanLocalStorage();
    }

    const alreadyLoggedIn = () => {
        let token = LocalStorageService.token.userToken;
        let _user = LocalStorageService.loggedInUser.info;
        if (token) {
            if (!_user) {
                // get user's information is token is available
                RestApiService.callApi('get', 'user/whoami', {}, (_user: IUser) => {
                    userLoggedIn(token!, _user);
                    // user was already logged in. and user info has been received. proceed to home
                    if (window.location.pathname === '/login' ||
                        window.location.pathname === '/register') {
                        navigate('/home');
                    }
                })
            }
            else {
                // already logged in!
                userLoggedIn(token!, _user);
            }
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
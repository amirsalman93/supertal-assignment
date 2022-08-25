import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import AboutPage from "../components/AboutPage";
import HomePage from "../components/HomePage";
import LoginPage from "../components/LoginPage";
import ManageMusicPage from "../components/ManageMusicPage";
import RegisterPage from "../components/RegisterPage";
import UserListingPage from "../components/UserListingPage";
import { useAuth } from "./AuthProvider";

interface IRoute {
    title?: string;
    path: string;
    IsNavBarItem?: boolean;
    element?: React.ReactNode | null;
}

export const AppRoutesList: IRoute[] = [
    { title: 'Login', path: '/login', element: <LoginPage /> },
    { title: 'Register', path: '/register', element: <RegisterPage /> },
    { title: 'Home', path: '/home', element: <HomePage />, IsNavBarItem: true },
    { title: 'Users', path: '/users', element: <UserListingPage />, IsNavBarItem: true },
    { title: 'Manage Music', path: '/manage-music', element: <ManageMusicPage />, IsNavBarItem: true },
    { title: 'About', path: '/about', element: <AboutPage />, IsNavBarItem: true },
    { title: 'Login', path: '*', element: <LoginPage /> },
]

export const getAllPossibleRoutes = () => {
    return _.uniq(AppRoutesList.map(route => route.path));
}

const RoutesContext = createContext<{
    switchRoutes: IRoute[];
    navBarItems: IRoute[];
    allPossibleRoutesStings: string[];
} | null>(null);

export const RoutesProvider = ({ children }: { children: any }) => {
    let auth = useAuth();
    const [navBarItems, setNavBarItems] = useState<IRoute[]>([]);
    const [switchRoutes, setSwitchRoutes] = useState<IRoute[]>(AppRoutesList);
    const [allPossibleRoutesStings, setAllPossibleRoutesStings] = useState<string[]>([]);

    useEffect(() => {
        setNavBarItems(AppRoutesList.filter(route => route.IsNavBarItem))
        setAllPossibleRoutesStings(_.uniq(AppRoutesList.map(route => route.path)));
    }, [auth?.user])

    return (<RoutesContext.Provider value={{ navBarItems, switchRoutes, allPossibleRoutesStings }}>
        {children}
    </RoutesContext.Provider>)
}

export const useRoutes = () => {
    return useContext(RoutesContext);
}
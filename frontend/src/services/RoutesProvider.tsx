import _ from "lodash";
import { createContext, useContext, useEffect, useState } from "react";
import AboutPage from "../components/AboutPage";
import ExplorePage from "../components/ExplorePage";
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
    protected?: boolean;
    adminOnly?: boolean;
    nonAdminOnly?: boolean;
}

export const AppRoutesList: IRoute[] = [
    { title: 'Login', path: '/login', element: <LoginPage /> },
    { title: 'Register', path: '/register', element: <RegisterPage /> },
    { title: 'Home', path: '/home', element: <HomePage />, IsNavBarItem: true, protected: true },
    { title: 'Explore', path: '/explore', element: <ExplorePage />, IsNavBarItem: true, protected: true, nonAdminOnly: true },
    { title: 'Users', path: '/users', element: <UserListingPage />, IsNavBarItem: true, protected: true, adminOnly: true },
    { title: 'Manage Music', path: '/manage-music', element: <ManageMusicPage />, IsNavBarItem: true, protected: true, adminOnly: true },
    { title: 'About', path: '/about', element: <AboutPage />, IsNavBarItem: true, protected: true },
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
    const [allPossibleRoutesStings] = useState<string[]>(_.uniq(AppRoutesList.map(route => route.path)));

    // call whenever auth.user updates
    useEffect(() => {
        if (!auth?.user) {
            // not logged in
            let allowedRoutes = AppRoutesList.filter(route => !route.protected);
            setSwitchRoutes(allowedRoutes);   // remove protected routes
            setNavBarItems(allowedRoutes.filter(route => route.IsNavBarItem))       // populate nav bar routes
        }
        else if (auth.user.username === 'admin') {
            let allowedRoutes = AppRoutesList.filter(route => !route.nonAdminOnly);
            setSwitchRoutes(allowedRoutes);   // allow all routes
            setNavBarItems(allowedRoutes.filter(route => route.IsNavBarItem))       // populate nav bar routes
        } else {
            let allowedRoutes = AppRoutesList.filter(route => !route.adminOnly);
            setSwitchRoutes(allowedRoutes);   // remove admin only routes
            setNavBarItems(allowedRoutes.filter(route => route.IsNavBarItem))       // populate nav bar routes
        }
    }, [auth?.user])

    return (<RoutesContext.Provider value={{ navBarItems, switchRoutes, allPossibleRoutesStings }}>
        {children}
    </RoutesContext.Provider>)
}

export const useRoutes = () => {
    return useContext(RoutesContext);
}
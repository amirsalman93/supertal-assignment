import AboutPage from "./AboutPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import ManageMusicPage from "./ManageMusicPage";
import RegisterPage from "./RegisterPage";
import _ from 'lodash'

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
    { title: 'Manage Music', path: '/manage-music', element: <ManageMusicPage />, IsNavBarItem: true },
    { title: 'About', path: '/about', element: <AboutPage />, IsNavBarItem: true },
    { title: 'Login', path: '*', element: <LoginPage /> },
]

export const getNavBarItems = () => {
    return AppRoutesList.filter(route => route.IsNavBarItem);
}

export const getAllPossibleRoutes = () => {
    return _.uniq(AppRoutesList.map(route => route.path));
}
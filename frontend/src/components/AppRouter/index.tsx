import React from 'react';
import { Route, Routes } from "react-router-dom";
import { useRoutes } from '../../services/RoutesProvider';

const AppRouter = () => {
    let routesContext = useRoutes();
    return (
        <Routes>
            {routesContext?.switchRoutes.map((route, i) => <Route {...route} key={i}></Route>)}
        </Routes>
    );
};

export default AppRouter;
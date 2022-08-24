import React from 'react';
import { Route, Routes } from "react-router-dom";
import { AppRoutesList } from '../routesList';

const AppRouter = () => {
    return (
        <Routes>
            {AppRoutesList.map((route, i) => <Route {...route} key={i}></Route>)}
        </Routes>
    );
};

export default AppRouter;
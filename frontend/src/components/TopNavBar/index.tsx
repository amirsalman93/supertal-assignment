import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthProvider';
import { useRoutes } from '../../services/RoutesProvider';
import Logout from '../Logout';
import './style.css'

const TopNavBar = () => {
    let auth = useAuth();
    let routesContext = useRoutes();
    let navigate = useNavigate();
    return (
        <nav>
            <h3 className='navbar-logo' onClick={() => navigate('/login')}>Supertal</h3>
            <div className='nav-container'>
                <ul style={!auth?.accessToken ? { display: 'none' } : {}} >
                    {routesContext?.navBarItems.map((item, i) => <li key={i}> <NavLink to={item.path}> {item.title} </NavLink> </li>)}
                </ul>
            </div>
            <Logout />
        </nav >
    );
};

export default TopNavBar;
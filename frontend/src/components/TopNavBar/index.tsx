import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../services/AuthProvider';
import Logout from '../Logout';
import { getNavBarItems } from '../routesList';
import './style.css'

const TopNavBar = () => {
    let auth = useAuth();
    return (
        <nav>
            <h3>Supertal</h3>
            <div className='nav-container'>
                <ul style={!auth?.accessToken ? { display: 'none' } : {}} >
                    {getNavBarItems().map((item, i) => <li key={i}> <NavLink to={item.path}> {item.title} </NavLink> </li>)}
                </ul>
            </div>
            <Logout />
        </nav >
    );
};

export default TopNavBar;
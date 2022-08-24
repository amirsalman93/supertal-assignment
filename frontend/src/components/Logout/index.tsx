import React from 'react';
import { useAuth } from '../../services/AuthProvider';

const Logout = () => {
    let auth = useAuth();

    return (
        <div style={!auth?.accessToken ? { visibility: 'hidden' } : {}} className={'logout-button'} onClick={auth?.logout}>
            Logout
        </div>
    );
};

export default Logout;
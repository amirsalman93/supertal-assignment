import React, { useEffect, useRef, useState } from 'react';
import { ToastService } from '../../services/ToastService';
import BigLogo from '../common/BigLogo';
import FormContainer from '../common/FormContainer';

const LoginPage = () => {
    const formId_and_class = 'login-page';
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        usernameRef.current?.focus();
    }, [])

    const loginButtonCallback = () => {
        if (validateForm()) {
            ToastService.Success('Valid');
            // todo: server call
        }
    }
    const validateForm = (): boolean => {
        let valid = true;
        if (!username) {
            ToastService.ThrowMissingFormFieldError('Username');
            usernameRef.current?.focus();
            valid = false;
        }
        else if (!password) {
            ToastService.ThrowMissingFormFieldError('Password');
            passwordRef.current?.focus();
            valid = false;
        }
        return valid;
    }

    const openRegisterForm = () => {
        // todo: open register user form
    }

    return (
        <div className={formId_and_class}>
            <BigLogo />
            <FormContainer title='User Login'>
                <label htmlFor='username'> Username </label>
                <input
                    type={'text'}
                    name='username'
                    id={`${formId_and_class}-username`}
                    ref={usernameRef}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor='password'> Password </label>
                <input
                    type={'text'}
                    name='password'
                    id={`${formId_and_class}-password`}
                    value={password}
                    ref={passwordRef}
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    type={'button'}
                    id={`${formId_and_class}-login-button`}
                    value={'Login'}
                    onClick={loginButtonCallback}
                />
                <input
                    type={'button'}
                    id={`${formId_and_class}-register-button`}
                    value={'New to Supertal? Register New Account'}
                    onClick={openRegisterForm}
                />
            </FormContainer>
        </div>
    );
};

export default LoginPage;
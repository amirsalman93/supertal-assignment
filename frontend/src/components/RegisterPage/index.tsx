import React, { useEffect, useRef, useState } from 'react';
import { ToastService } from '../../services/ToastService';
import BigLogo from '../common/BigLogo';
import FormContainer from '../common/FormContainer';

const RegisterPage = () => {
    const formId_and_class = 'register-form';

    const usernameRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repasswordRef = useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    useEffect(() => {
        usernameRef.current?.focus();
    }, [])

    const registerButtonCallback = () => {
        if (validateForm()) {
            ToastService.Success('Valid');
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
        } else if (!repassword) {
            ToastService.ThrowMissingFormFieldError('Confirm Password');
            repasswordRef.current?.focus();
            valid = false;
        } else if (password !== repassword) {
            ToastService.ThrowMismatchFormFieldError('Password');
            repasswordRef.current?.focus();
            valid = false;
        }
        return valid;
    }

    return (
        <div className={formId_and_class}>
            <BigLogo />
            <FormContainer title='Register New Account'>
                <label htmlFor='username'> Username </label>
                <input
                    type={'text'}
                    name='username'
                    id={`${formId_and_class}-username`}
                    ref={usernameRef}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor='name'> Name </label>
                <input
                    type={'text'}
                    name='name'
                    id={`${formId_and_class}-name`}
                    ref={nameRef}
                    value={name}
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
                <label htmlFor='repassword'> Confirm Password </label>
                <input
                    type={'text'}
                    name='repassword'
                    id={`${formId_and_class}-repassword`}
                    value={repassword}
                    ref={repasswordRef}
                    onChange={e => setRepassword(e.target.value)}
                />
                <input
                    type={'button'}
                    id={`${formId_and_class}-register-button`}
                    value={'Register'}
                    onClick={registerButtonCallback}
                />
                <input
                    type={'button'}
                    id={`${formId_and_class}-login-button`}
                    value={'Already have an Account? Login'}
                />
            </FormContainer>

        </div>
    );
};

export default RegisterPage;
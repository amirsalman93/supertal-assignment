import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/AuthProvider';
import { LocalStorageService } from '../../services/LocalStorageService';
import { RestApiService } from '../../services/RestApiService';
import { ToastService } from '../../services/ToastService';
import { ICreateUser, IUser } from '../../types/users';
import BigLogo from '../common/BigLogo';
import ButtonField from '../common/form/Field/ButtonField';
import InputField from '../common/form/Field/InputField';
import { FormValidators } from '../common/form/form-utils';
import FormContainer from '../common/form/FormContainer';

const formId_and_class = 'register-form';

const RegisterPage = () => {
    let auth = useAuth();
    let navigate = useNavigate();

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
            let createUser: ICreateUser = {
                name: name,
                username: username,
                password: password
            }
            RestApiService.callApi('post', 'user', createUser, (user: IUser) => {
                ToastService.Success(`User created successfully with username: '${user.username}'.`)
            })
        }
    }
    const validateForm = (): boolean => {
        let valid = true;

        valid = valid && FormValidators.validateInputReqField(usernameRef, 'Username', username);
        valid = valid && FormValidators.validateInputReqField(nameRef, 'Name', name);
        valid = valid && FormValidators.validateInputReqField(passwordRef, 'Password', password);
        valid = valid && FormValidators.validateInputReqField(repasswordRef, 'Confirm Password', repassword);
        valid = valid && FormValidators.validateInputMismatchField(repasswordRef, 'Password', password, repassword);

        return valid;
    }
    const openLoginForm = () => {
        navigate('/login');
    }

    return (
        <div className={formId_and_class}>
            <BigLogo />
            <FormContainer title='Register New Account'>
                <InputField
                    formId={formId_and_class}
                    fieldId={'username'}
                    label={'Username'}
                    value={username}
                    setValue={setUsername}
                    fieldRef={usernameRef}
                    onEnter={registerButtonCallback}
                />
                <InputField
                    formId={formId_and_class}
                    fieldId={'name'}
                    label={'Name'}
                    value={name}
                    setValue={setName}
                    fieldRef={nameRef}
                    onEnter={registerButtonCallback}
                />
                <InputField
                    formId={formId_and_class}
                    fieldId={'password'}
                    label={'Password'}
                    value={password}
                    setValue={setPassword}
                    fieldRef={passwordRef}
                    type={'password'}
                    onEnter={registerButtonCallback}
                />
                <InputField
                    formId={formId_and_class}
                    fieldId={'repassword'}
                    label={'Confirm Password'}
                    value={repassword}
                    setValue={setRepassword}
                    fieldRef={repasswordRef}
                    type={'password'}
                    onEnter={registerButtonCallback}
                />
                <ButtonField
                    formId={formId_and_class}
                    fieldId={'register-button'}
                    label={'Register'}
                    onClick={registerButtonCallback}
                />
                <ButtonField
                    formId={formId_and_class}
                    fieldId={'login-button'}
                    label={'Already have an Account? Login'}
                    onClick={openLoginForm}
                />
            </FormContainer>

        </div>
    );
};

export default RegisterPage;
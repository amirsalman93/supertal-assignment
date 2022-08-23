import React, { useEffect, useRef, useState } from 'react';
import { RestApiService } from '../../services/RestApiService';
import { ToastService } from '../../services/ToastService';
import { IAccessToken, IUserCredentials } from '../../types/users';
import BigLogo from '../common/BigLogo';
import ButtonField from '../common/form/Field/ButtonField';
import InputField from '../common/form/Field/InputField';
import { FormValidators } from '../common/form/form-utils';
import FormContainer from '../common/form/FormContainer';

const formId_and_class = 'login-page';

const LoginPage = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        usernameRef.current?.focus();
    }, [])

    const loginButtonCallback = () => {
        if (validateForm()) {
            let loginUser: IUserCredentials = {
                username: username,
                password: password
            }
            // ToastService.Success('Valid');
            RestApiService.callApi('post', 'users/login', loginUser, (tokenResponse: IAccessToken) => {
                ToastService.Success(`Welocme token '${tokenResponse.access_token}'.`)

                // todo: redirect to home page
                setTimeout(() => ToastService.Success('Redirecting...'), 1000);
            })
        }
    }
    const validateForm = (): boolean => {
        let valid = true;

        valid = valid && FormValidators.validateInputReqField(usernameRef, 'Username', username);
        valid = valid && FormValidators.validateInputReqField(passwordRef, 'Password', password);

        return valid;
    }

    const openRegisterForm = () => {
        // todo: open register user form
    }

    return (
        <div className={formId_and_class}>
            <BigLogo />
            <FormContainer title='User Login'>
                <InputField
                    formId={formId_and_class}
                    fieldId={'username'}
                    label={'Username'}
                    value={username}
                    setValue={setUsername}
                    fieldRef={usernameRef}
                    onEnter={loginButtonCallback}
                />
                <InputField
                    formId={formId_and_class}
                    fieldId={'password'}
                    label={'Password'}
                    value={password}
                    setValue={setPassword}
                    type={'password'}
                    fieldRef={passwordRef}
                    onEnter={loginButtonCallback}
                />
                <ButtonField
                    formId={formId_and_class}
                    fieldId={'login-button'}
                    label={'Login'}
                    onClick={loginButtonCallback}
                />
                <ButtonField
                    formId={formId_and_class}
                    fieldId={'register-button'}
                    label={'New to Supertal? Register New Account'}
                />
            </FormContainer>
        </div>
    );
};

export default LoginPage;
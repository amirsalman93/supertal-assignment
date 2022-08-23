import React, { useEffect, useRef, useState } from 'react';
import { ToastService } from '../../services/ToastService';
import BigLogo from '../common/BigLogo';
import ButtonField from '../common/form/Field/ButtonField';
import InputField from '../common/form/Field/InputField';
import FormContainer from '../common/form/FormContainer';

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
                />
            </FormContainer>

        </div>
    );
};

export default RegisterPage;
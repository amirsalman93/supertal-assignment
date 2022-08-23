import React, { Fragment } from 'react';

export interface IInputFieldProps {
    formId: string;
    fieldId: string;
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    type?: 'text' | 'password';
    fieldRef?: React.RefObject<HTMLInputElement>;
    onEnter?: { (e?: React.KeyboardEvent<HTMLInputElement>): void }
}
const InputField = (props: IInputFieldProps) => {
    const { formId, fieldId, type, label, fieldRef, value, setValue, onEnter } = props;
    return (
        <Fragment>
            <label htmlFor={fieldId}> {label} </label>
            <input
                type={type ?? 'text'}
                name={fieldId}
                id={`${formId}-${fieldId}`}
                ref={fieldRef}
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={(e) => (e.key === 'Enter') && onEnter && onEnter(e)}
            />
        </Fragment>
    );
};

export default InputField;
import React from 'react';

export interface IButtonFieldProps {
    formId: string;
    fieldId: string;
    label: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>
}

const ButtonField = (props: IButtonFieldProps) => {
    const { formId, fieldId, label, onClick } = props;
    return (
        <input
            type={'button'}
            id={`${formId}-${fieldId}`}
            value={label}
            onClick={onClick}
        />
    );
};

export default ButtonField;
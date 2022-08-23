import React from 'react';

interface IProps {
    formId: string;
    fieldId: string;
    label: string;
    onClick?: React.MouseEventHandler<HTMLInputElement>
}

const ButtonField = (props: IProps) => {
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
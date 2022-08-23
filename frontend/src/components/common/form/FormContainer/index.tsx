import React from 'react';


const FormContainer = (props: {
    children: any,
    title: string
}) => {
    return (
        <div className='form-container'>
            <div className='form-title'>{props.title}</div>
            <section className='form-section'>
                <form className='column-flex' autoComplete='off'>
                    {props.children}
                </form>
            </section>
        </div>

    );
};

export default FormContainer;
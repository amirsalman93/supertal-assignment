import React from 'react';
import './style.css'

const instructions: string[] = [
    "You can register new user.",
    "You can login as an existing user.",
    "You can browse music from Artists"
]

const AboutPage = () => {
    return (
        <div className='about-page'>
            <h3>
                Welcome to Supertal Music. You can perform following actions.
            </h3>
            <div className='instructions'>
                <ol>
                    {instructions.map(ins => <li>{ins}</li>)}
                </ol>
            </div>
        </div>
    );
};

export default AboutPage;
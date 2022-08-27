import React from 'react';
import { Button } from 'reactstrap';
import './style.css'

type Props = {
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}
const SingleCenterButton = (props: Props) => {
    const { title, onClick } = props;
    return (
        <div className='single-center-button'>
            <Button onClick={onClick}>{title}</Button>
        </div>
    );
};

export default SingleCenterButton;
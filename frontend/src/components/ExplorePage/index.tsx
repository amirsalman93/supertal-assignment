import React, { useMemo, useState } from 'react';
import SubNavBar, { ITabProperties } from '../common/SubNavBar';
import ArtistsPage from './ArtistsPage';
import './style.css'

const ExplorePage = () => {
    const tabs = useMemo<ITabProperties[]>(() => ([
            {
                title: 'Artists',
                component: <ArtistsPage />
            },
            {
                title: 'Albums',
                component: <div>Albums</div>
            },
            {
                title: 'Tracks',
                component: <div>Tracks</div>
            }
        ]), [])
    return (
        <div className='explore-page'>
            <SubNavBar tabs={tabs} />
        </div>
    );
};

export default ExplorePage;
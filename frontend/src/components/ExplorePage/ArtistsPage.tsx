import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { RestApiService } from '../../services/RestApiService';
import { IArtistWithCounts } from '../../types/IArtist';
import CustomTable, { ITableColumns, ITableRecord } from '../common/CustomTable';
import Dialog from '../common/Dialog';

const columns: ITableColumns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Genres',
        accessor: 'genres',
    },
    {
        Header: 'Active Since',
        accessor: 'activeSince',
    },
    {
        Header: 'No of Albums',
        accessor: 'albumCount',
    },
    {
        Header: 'No of Tracks',
        accessor: 'trackCount'
    },
]

const ArtistsPage = () => {
    const [artists, setArtists] = useState<IArtistWithCounts[]>([]);
    const [viewArtist, setViewArtist] = useState<boolean>(false)
    const [selectedArtist, setSelectedArtist] = useState<IArtistWithCounts | null>(null);

    useEffect(() => {
        console.log('fetch')
        RestApiService.callApi('get', 'artist', {}, (_artists: IArtistWithCounts[]) => setArtists(_artists))
    }, [])

    const onArtistRowClick = (record: ITableRecord) => {
        let artist: IArtistWithCounts = record as IArtistWithCounts;
        setSelectedArtist(artist);
        setViewArtist(true);
    }

    return (
        <Row>
            <Col>
                <CustomTable columns={columns} data={artists} onRowSingleClick={onArtistRowClick} />
                {viewArtist && <Dialog
                    isOpen={viewArtist}
                    title={`Music by '${selectedArtist?.name}'`}
                    className={'view-artist-info-dialog'}
                    closeDialog={() => { setViewArtist(false) }}
                />}
            </Col>
        </Row>
    );
};

export default ArtistsPage;
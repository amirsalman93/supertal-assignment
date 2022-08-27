import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { RestApiService } from '../../services/RestApiService';
import { ToastService } from '../../services/ToastService';
import { IArtist } from '../../types/IArtist';
import { dataFormatter } from '../../utils';
import CustomTable, { ITableColumns, ITableRecord } from '../common/CustomTable';
import Dialog from '../common/Dialog';
import ButtonField from '../common/form/Field/ButtonField';
import InputField from '../common/form/Field/InputField';
import FormContainer from '../common/form/FormContainer';
import SingleCenterButton from '../common/SingleCenterButton';
import ViewArtistPage from './ViewArtist';

const columns: ITableColumns = [
    {
        Header: 'Artist',
        accessor: 'name',
    },
    {
        Header: 'Tracks',
        accessor: 'tracks',
        formatter: dataFormatter.arrayCount
    },
    {
        Header: 'Albmus',
        accessor: 'albums',
        formatter: dataFormatter.arrayCount
    },
]

type Props = {
    edit?: boolean;
}

const ArtistsPage = (props: Props) => {
    const { edit } = props;
    const [newArtistName, setNewArtistName] = useState<string>("");
    const [artists, setArtists] = useState<IArtist[]>([]);
    const [viewArtist, setViewArtist] = useState<boolean>(false)
    const [selectedArtist, setSelectedArtist] = useState<IArtist | null>(null);
    const [openAddForm, setOpenAddForm] = useState(false);

    useEffect(() => {
        fetchAllArtists();
    }, [])

    const fetchAllArtists = () => {
        RestApiService.callApi('get', 'artist', {}, (_artists: IArtist[]) => setArtists(_artists))
    }

    const addNewArtist = () => {
        RestApiService.callApi('post', 'artist', {
            name: newArtistName
        }, (_artist: IArtist) => {
            ToastService.Success(`Added '${_artist.name}' successfully`);
            setOpenAddForm(false);
            fetchAllArtists();
        })
    }

    const onArtistRowClick = (record: ITableRecord) => {
        let artist: IArtist = record as IArtist;
        setSelectedArtist(artist);
        setViewArtist(true);
    }
    return (
        <Fragment>
            {edit ? <Row>
                <SingleCenterButton onClick={() => setOpenAddForm(true)} title={'Add new Artist'} />
                {openAddForm ? <Dialog
                    isOpen={openAddForm}
                    title={"Add new Artist"}
                    body={<FormContainer title='Details'>
                        <InputField fieldId='newArtistNameId' formId='addNewArtist' label='New Artist Name' value={newArtistName} setValue={setNewArtistName} onEnter={addNewArtist} />
                        <ButtonField fieldId='addNewArtistButtonId' formId='addNewArtist' label='Add' onClick={addNewArtist} />
                    </FormContainer>}
                    className={'add-new-artist-info-dialog'}
                    closeDialog={() => { setOpenAddForm(false) }}
                /> : null}

            </Row> : null}
            <Row>
                <Col>
                    <CustomTable columns={columns} data={artists} onRowSingleClick={onArtistRowClick} />
                    {viewArtist && <Dialog
                        isOpen={viewArtist}
                        title={`Music by '${selectedArtist?.name}'`}
                        body={<ViewArtistPage id={selectedArtist?.id!} edit={edit} />}
                        className={'view-artist-info-dialog'}
                        closeDialog={() => { setViewArtist(false) }}
                    />}
                </Col>
            </Row>
        </Fragment>
    );
};

export default ArtistsPage;
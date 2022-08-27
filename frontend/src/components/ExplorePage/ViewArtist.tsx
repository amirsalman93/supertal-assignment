import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { RestApiService } from '../../services/RestApiService';
import { ToastService } from '../../services/ToastService';
import { IAlbum } from '../../types/IAlbum';
import { IArtist } from '../../types/IArtist';
import { ITrack } from '../../types/ITrack';
import CustomTable, { ITableColumns } from '../common/CustomTable';
import Dialog from '../common/Dialog';
import ButtonField from '../common/form/Field/ButtonField';
import InputField from '../common/form/Field/InputField';
import FormContainer from '../common/form/FormContainer';
import SingleCenterButton from '../common/SingleCenterButton';

const columns: ITableColumns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Length (minutes)',
        accessor: 'length',
    },
    {
        Header: 'Track Number',
        accessor: 'track',
    },
    {
        Header: 'Lyrics',
        accessor: 'lyrics',
    },
    {
        Header: 'File URL',
        accessor: 'fileUrl'
    },
]

type IProps = {
    id: string;
    edit?: boolean;
}

const ViewArtistPage = (props: IProps) => {
    const { id, edit } = props;
    const [newTrackName, setNewTrackName] = useState<string>("");
    const [newLength, setLength] = useState<string>("");
    const [newTrackNum, setTrackNum] = useState<string>("");
    const [newTrackLyrics, setNewTrackLyrics] = useState<string>("");
    const [newFileUrl, setFileUrl] = useState<string>("");
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const [openAddForm, setOpenAddForm] = useState(false);

    useEffect(() => {
        fetchArtist();
    }, [])

    const fetchArtist = () => {
        RestApiService.callApi('getById', 'artist', id, (_artist: IArtist) => {
            setTracks(_artist.tracks!);
        })
    }

    const addNewTrack = () => {
        RestApiService.callApi('patch', 'artist', {
            id: id,
            tracks: {
                create: [{
                    name: newTrackName,
                    length: parseInt(newLength),
                    track: parseInt(newTrackNum),
                    lyrics: newTrackLyrics,
                    fileUrl: newFileUrl
                }]
            }
        }, (_track: ITrack) => {
            ToastService.Success("Added new track")
            setOpenAddForm(false);
            fetchArtist()
        })
    }

    return (
        <Fragment>
            {edit ? <Row>
                <SingleCenterButton onClick={() => setOpenAddForm(true)} title={'Add new Track'}/>
                {openAddForm ? <Dialog
                    isOpen={openAddForm}
                    title={"Add new Track"}
                    body={<FormContainer title='Details'>
                        <InputField fieldId='nameId' formId='addNewTrack' label='Track Name' value={newTrackName} setValue={setNewTrackName} />
                        <InputField fieldId='lengthId' formId='addNewTrack' label='Length' value={newLength} setValue={setLength} />
                        <InputField fieldId='trackId' formId='addNewTrack' label='Track Num' value={newTrackNum} setValue={setTrackNum} />
                        <InputField fieldId='lyricsId' formId='addNewTrack' label='Lyrics' value={newTrackLyrics} setValue={setNewTrackLyrics} />
                        <InputField fieldId='fileUrlId' formId='addNewTrack' label='File URL' value={newFileUrl} setValue={setFileUrl} />
                        <ButtonField fieldId='buttonId' formId='addNewTrack' label='Add' onClick={addNewTrack} />
                    </FormContainer>}
                    className={'add-new-track-info-dialog'}
                    closeDialog={() => { setOpenAddForm(false) }}
                /> : null}

            </Row> : null}
            <Row>
                <Col>
                    <CustomTable columns={columns} data={tracks} />
                </Col>
            </Row>
        </Fragment>
    );
};

export default ViewArtistPage;
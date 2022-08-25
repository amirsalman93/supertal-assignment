import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { RestApiService } from '../../services/RestApiService';
import { IUser } from '../../types/users';
import CustomTable, { ITableColumns, ITableRecord } from '../common/CustomTable';
import Dialog from '../common/Dialog';

// const data = React.useMemo(
//     () => [
//         {
//             col1: 'Hello',
//             col2: 'World',
//         },
//         {
//             col1: 'react-table',
//             col2: 'rocks',
//         },
//         {
//             col1: 'whatever',
//             col2: 'you want',
//         },
//     ],
//     []
// )

const columns: ITableColumns = [
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'Role',
        accessor: 'role'
    },
    {
        Header: 'Favorites',
        accessor: 'favCount'
    },
]

const UserListingPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [viewUserInfoDialog, setViewUserInfoDialog] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    useEffect(() => {
        RestApiService.callApi('get', 'users', {}, (_users: IUser[]) => setUsers(_users))
    }, [])

    const onUserRowClick = (record: ITableRecord) => {
        let user: IUser = record as IUser;
        setSelectedUser(user);
        setViewUserInfoDialog(true);
    }

    return (
        <Row>
            <Col>
                <CustomTable columns={columns} data={users} onRowSingleClick={onUserRowClick} />
                {viewUserInfoDialog && <Dialog
                    isOpen={viewUserInfoDialog}
                    title={`Profile View for '${selectedUser?.username}'`}
                    className={'view-user-info-dialog'}
                    closeDialog={() => { setViewUserInfoDialog(false) }}
                />}
            </Col>
        </Row>
    );
};

export default UserListingPage;
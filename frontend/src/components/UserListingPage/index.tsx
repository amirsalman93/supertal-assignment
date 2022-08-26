import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { RestApiService } from '../../services/RestApiService';
import { IUser } from '../../types/users';
import CustomTable, { ITableColumns } from '../common/CustomTable';

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
        Header: 'Favorites',
        accessor: 'favCount'
    },
]

const UserListingPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        RestApiService.callApi('get', 'user', {}, (_users: IUser[]) => setUsers(_users))
    }, [])

    return (
        <Row>
            <Col>
                <CustomTable columns={columns} data={users} />
            </Col>
        </Row>
    );
};

export default UserListingPage;
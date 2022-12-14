import React from 'react'
import { useTable } from 'react-table'
import './style.css'

interface ITableColumn {
    Header: string;
    accessor: string;
    formatter?: (data: any) => any;
}

export interface ITableColumns extends Array<ITableColumn> { }
export interface ITableRecord { [s: string]: any }
export interface ITableData extends Array<ITableRecord> { }

interface IProps {
    columns: ITableColumn[];
    data: ITableData;
    onRowSingleClick?: { (record: ITableRecord): void };
}

function CustomTable(props: IProps) {
    const { data, columns, onRowSingleClick } = props;

    let validatedData = data;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: Array.isArray(data) ? data : [] })

    return (
        <table className='custom-table' {...getTableProps()} style={{ width: '100%' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={(e) => {
                            e.stopPropagation();
                            onRowSingleClick && onRowSingleClick(row.original);
                        }}>
                            {row.cells.map(cell => {
                                const column = cell.column as any;
                                const fomatter = column.formatter;
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                    >
                                        {fomatter ? fomatter(cell.value) : cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CustomTable;
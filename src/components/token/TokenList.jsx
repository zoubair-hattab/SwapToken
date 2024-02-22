import React from 'react';
import { Link } from 'react-router-dom';
import './tokenList.css';
import { IoIosStarOutline, IoMdStar } from 'react-icons/io';
import { useReadContract } from 'wagmi';
import contractDexAbi from '../../utils/CustomDex.json';
import { formatEther } from 'viem';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import { colors } from '@mui/material';

const TokenList = () => {
  const addresss = '0x22dBC07bc0d02bfEA8529E90b5CB667a2eaC87Fb';

  const { data: getTokens } = useReadContract({
    address: addresss,
    abi: contractDexAbi.abi,
    functionName: 'getAllHistory',
  });

  const newTable = getTokens?.map((history, inede) => ({
    historyId: Number(history.historyId),
    tokenA: history.tokenA,
    tokenB: history.tokenB,
    inputValue: Number(formatEther(history?.inputValue)).toFixed(6),
    outputValue: Number(formatEther(history?.outputValue)).toFixed(6),
    userAddress: history.userAddress,
  }));
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'user', headerName: 'User', width: 300 },
    { field: 'from', headerName: ' From', width: 180 },
    {
      field: 'to',
      headerName: 'To',
      width: 140,
    },
    {
      field: 'input',
      headerName: 'input',
      width: 140,
    },
    {
      field: 'output',
      headerName: ' Output',
      width: 180,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 180,
      renderCell: (params) => {
        return <p className="status">{params.row.status}</p>;
      },
    },
  ];
  const rows =
    (newTable &&
      newTable?.map((history) => ({
        id: Number(history.historyId),
        user: history.userAddress,
        from: history.tokenA,
        to: history.tokenB,
        input: history?.inputValue,
        output: history?.outputValue,
        status: 'completed',
      }))) ||
    [];

  return (
    <section className="section " aria-label="market update" data-section>
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Market Update</h2>
        </div>

        <div className="market-tab">
          <ul className="tab-nav">
            <li>
              <button className="tab-btn active">View All Transaction</button>
            </li>
          </ul>
          <DataGrid
            rows={rows && rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10]}
            checkboxSelection
            componentsProps={{
              pagination: {
                sx: {
                  backgroundColor: '#3874ff',
                  color: 'white',
                  fontWeight: 700,
                },
              },
            }}
            sx={{
              [`& .${gridClasses.row}`]: {
                color: grey[200],
                fontSize: '19px',
              },
              [`& .${gridClasses.columnHeaders}`]: {
                color: grey[200],
                fontSize: '20px',
                fontWeight: 'bold',
              },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TokenList;

import React, { useEffect } from 'react';
import './trend.css';
import { Link } from 'react-router-dom';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import contractDexAbi from '../../../utils/CustomDex.json';
import { formatEther } from 'viem';

const Trend = () => {
  const addresss = '0x22dBC07bc0d02bfEA8529E90b5CB667a2eaC87Fb';
  const { address } = useAccount();
  const initialState = [
    { title: 'Eth', name: 'Ethereum' },
    { title: 'Matic Token', name: 'Polygon' },
    { title: 'Tether USD', name: 'Tether' },
    { title: 'TRON', name: 'TRON' },
    { title: 'Uniswap', name: 'Uniswap' },
    { title: 'BNB', name: 'Binance' },
  ];
  const tableImage = [
    'https://codewithsadee.github.io/cryptex/assets/images/coin-2.svg',
    'https://cdn.iconscout.com/icon/free/png-512/free-polygon-token-4086724-3379854.png?f=webp&w=256',
    'https://codewithsadee.github.io/cryptex/assets/images/coin-3.svg',
    'https://cryptologos.cc/logos/torn-torn-logo.svg?v=029',
    'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=029',
    'https://codewithsadee.github.io/cryptex/assets/images/coin-4.svg',
  ];
  const gatBalance = {
    address: addresss,
    abi: contractDexAbi.abi,
    functionName: 'getBalance',
  };
  const getTotalSuply = {
    address: addresss,
    abi: contractDexAbi.abi,
    functionName: 'getTotalSupply',
  };
  const { data, error, isPending, refetch } = useReadContracts({
    contracts: initialState.map((item) => ({
      ...gatBalance,
      args: [item.title, address],
    })),
  });

  const { data: getTotalSuplys, error: errorTotalSuply } = useReadContracts({
    contracts: initialState.map((item) => ({
      ...getTotalSuply,
      args: [item.title],
    })),
  });
  const totalSuply = getTotalSuplys?.map((item, index) => ({
    totalSyply: formatEther(item?.result ? item?.result : 0),
    name: initialState[index].title,
  }));
  const datas = data?.map((item, index) => ({
    price: Number(formatEther(item?.result ? item?.result : 0)).toFixed(6),
    name: initialState[index].title,
  }));

  return (
    <section className="section trend " aria-label="crypto trend" data-section>
      <div className="container">
        <div className="trend-tab">
          <ul className="tab-nav">
            <li>
              <button className="tab-btn active">
                All Listed Tokens For Sale
              </button>
            </li>
          </ul>

          <ul className="tab-content">
            {initialState?.map((item, index) => (
              <li key={index}>
                <div className="trend-card ">
                  <div className="card-title-wrapper">
                    <img
                      src={tableImage[index]}
                      width="24"
                      height="24"
                      alt="ethereum logo"
                    />

                    <Link to="#" className="card-title">
                      {item.name} <span className="span">{item.title}</span>
                    </Link>
                  </div>

                  <data className="card-value" value="3480.04">
                    TotalSuply {totalSuply && totalSuply[index]?.totalSyply}
                  </data>

                  <div className="card-analytics">
                    <data className="current-price" value="36641.20">
                      Your Balance
                    </data>

                    <div className="badge green">
                      {datas && datas[index].price}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Trend;

import React, { useEffect, useState } from 'react';
import './formField.css';
import contractDexAbi from '../../../utils/CustomDex.json';
import contractTokenAbi from '../../../utils/CustomToken.json';
import loader from '../../../assets/loader.gif';
import regret from '../../../assets/regret.jpeg';
import { IoMdClose } from 'react-icons/io';
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { parseEther } from 'viem';
const FormField = () => {
  const addresss = '0x22dBC07bc0d02bfEA8529E90b5CB667a2eaC87Fb';

  const initialState = [
    { title: 'Eth' },
    { title: 'Tether USD' },
    { title: 'BNB' },
    { title: 'TRON' },
    { title: 'Matic Token' },
    { title: 'Uniswap' },
  ];
  const [coinInput, setCoinInput] = useState();
  const [coinOuput, setCoinOuput] = useState();
  const { address } = useAccount();
  const [inputAmount, setInputAmount] = useState(0.0);
  const [ouputAmount, setOuputAmount] = useState(0.0);
  const [inputCoin, setInputCoin] = useState('Eth');
  const [text, setText] = useState('');

  const [ouputCoin, setOuputCoin] = useState('');
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (inputAmount > 0 && ouputAmount > 0) {
      setText('Swap');
    } else {
      setText('Enter Amount');
    }
    const filtredinput = initialState.filter(
      (item) => item?.title !== inputCoin
    );

    const filtredouput = initialState.filter(
      (item) => item?.title !== ouputCoin
    );
    if (inputCoin == 'Eth' && ouputCoin) {
      setOuputAmount(Number(parseEther(inputAmount.toString())) / 10 ** 14);
    }
    if (ouputCoin == 'Eth') {
      setOuputAmount(Number(parseEther(inputAmount.toString())) / 10 ** 22);
    } else if (inputCoin != 'Eth' && ouputCoin != 'Eth') {
      setOuputAmount(inputAmount);
    }
    setCoinInput(filtredouput);
    setCoinOuput(filtredinput);
  }, [inputCoin, ouputCoin, inputAmount, ouputAmount]);
  const {
    data: hash,
    error,
    writeContract: swap,
    isPending,
  } = useWriteContract();
  const {
    data: hashApprove,
    error: errorApprove,
    writeContract: approve,
    isPending: isPendingApprove,
  } = useWriteContract();

  const { data: getTokenAddress } = useReadContract({
    address: addresss,
    abi: contractDexAbi.abi,
    functionName: 'getTokenAddress',
    args: [inputCoin],
  });
  const { data: getTokenAddressOuput } = useReadContract({
    address: addresss,
    abi: contractDexAbi.abi,
    functionName: 'getTokenAddress',
    args: [ouputCoin],
  });

  // approving function
  const approvefn = () => {
    approve({
      address: getTokenAddress,
      abi: contractTokenAbi.abi,
      functionName: 'approve',
      args: [addresss, parseEther(inputAmount.toString())],
    });
  };

  const {
    data: allowanceInput,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    refetch: refetchAllowance,
    queryKey,
  } = useReadContract({
    address: getTokenAddress && getTokenAddress,
    abi: contractTokenAbi.abi,
    functionName: 'allowance',
    args: [address, addresss],
  });

  //waiting untill the function add to the blockchain
  const { isLoading: isConfirmingApprove, isSuccess: isConfirmedApprove } =
    useWaitForTransactionReceipt({
      hash: hashApprove,
    });
  const { isLoading: isConfirmingswap, isSuccess: isConfirmedsawp } =
    useWaitForTransactionReceipt({
      hash,
    });
  // swap function
  const swapFunction = (e) => {
    e.preventDefault();
    if (inputAmount > 0 && ouputAmount > 0 && ouputCoin) {
      if (inputCoin == 'Eth' && ouputCoin != 'Eth') {
        swap({
          address: addresss,
          abi: contractDexAbi.abi,
          functionName: 'swapEthToToken',
          args: [ouputCoin],
          value: parseEther(inputAmount.toString()),
        });
      } else if (inputCoin != 'Eth' && ouputCoin == 'Eth') {
        if (allowanceInput < parseEther(inputAmount.toString())) {
          approvefn();
        } else {
          swap({
            address: addresss,
            abi: contractDexAbi.abi,
            functionName: 'swapTokenToEth',
            args: [inputCoin, parseEther(inputAmount.toString())],
          });
        }
      } else if (inputCoin != 'Eth' && ouputCoin != 'Eth') {
        if (allowanceInput < parseEther(inputAmount.toString())) {
          approvefn();
        } else {
          swap({
            address: addresss,
            abi: contractDexAbi.abi,
            functionName: 'swapTokenToToken',
            args: [inputCoin, ouputCoin, parseEther(inputAmount.toString())],
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isConfirmedApprove || isConfirmedsawp) {
      refetchAllowance?.();
    }
  }, [isConfirmedApprove, isConfirmedsawp, refetchAllowance, address]);
  useEffect(() => {
    if (inputCoin != 'Eth' && ouputCoin == 'Eth') {
      if (
        isConfirmedApprove &&
        allowanceInput >= parseEther(inputAmount.toString())
      ) {
        swap({
          address: addresss,
          abi: contractDexAbi.abi,
          functionName: 'swapTokenToEth',
          args: [inputCoin, parseEther(inputAmount.toString())],
        });
      }
    } else if (inputCoin != 'Eth' && ouputCoin != 'Eth') {
      if (
        isConfirmedApprove &&
        allowanceInput >= parseEther(inputAmount.toString())
      ) {
        swap({
          address: addresss,
          abi: contractDexAbi.abi,
          functionName: 'swapTokenToToken',
          args: [inputCoin, ouputCoin, parseEther(inputAmount.toString())],
        });
      }
    }
  }, [
    isConfirmedApprove,
    allowanceInput,
    isConfirmedsawp,
    inputAmount,
    ouputAmount,
  ]);
  return (
    <form className="form" onSubmit={swapFunction}>
      <div className="wrapper">
        <div className="form-controller">
          <input
            type="number"
            className="input-box"
            onChange={(e) => setInputAmount(e.target.value)}
            value={inputAmount}
          />
          <select onChange={(e) => setInputCoin(e.target.value)}>
            {coinInput?.map((item, index) => (
              <option value={item.title} key={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-controller">
          <input
            type="number"
            className="input-box"
            onChange={(e) => setOuputAmount(e.target.value)}
            value={ouputAmount}
          />
          <select onChange={(e) => setOuputCoin(e.target.value)}>
            <option value="" defaultChecked>
              Select
            </option>

            {coinOuput?.map((item, index) => (
              <option value={item?.title} key={item?.title}>
                {item?.title}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary herobtn">{text}</button>
      </div>
      {(isConfirmingApprove || isConfirmingswap) && (
        <div className="waitTranstion">
          <span>Please wait until the transaction is confirmed. </span>
          <img src={loader} width={50} height={50} />
        </div>
      )}
    </form>
  );
};

export default FormField;

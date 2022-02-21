// use-fetch-data.js
import { useEffect, useState} from 'react';
import axios from 'axios';

const useGetsolanabalance = (myaddress: any) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(myaddress);
  const url = "https://solana-gateway.moralis.io/account/devnet/" + myaddress + "/balance";
  console.log(url);
  useEffect(() => {
    const fetchData = async (myaddress: any) => {
      try {
        console.log(url, myaddress);
        // const { data: response } = await axios.get('https://solana-gateway.moralis.io/account/devnet/HTJFiPE1BjZ5aAezu6MvfBoePCHna3LZnizkuxCBNZMp/balance/', {headers: {'accept': 'application/json', 'X-API-Key': 'tWGtcgK6Z3DL30EqKtw984SzVLNGBbl5LUdPSGaZ1W8oWJelyrni7hPV8H672IUs'}});
        // console.log('https://solana-gateway.moralis.io/account/devnet/' + myaddress + '/balance/');
        const { data: response } = await axios.get(url, {headers: {'accept': 'application/json', 'X-API-Key': 'tWGtcgK6Z3DL30EqKtw984SzVLNGBbl5LUdPSGaZ1W8oWJelyrni7hPV8H672IUs'}});
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData(myaddress);
  }, []);

  return {
    data,
    loading,
  };
};

export default useGetsolanabalance;

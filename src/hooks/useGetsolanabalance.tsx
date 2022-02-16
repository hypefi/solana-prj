// use-fetch-data.js
import { useEffect, useState} from 'react';
import axios from 'axios';

const useGetsolanabalance = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('https://solana-gateway.moralis.io/account/devnet/HTJFiPE1BjZ5aAezu6MvfBoePCHna3LZnizkuxCBNZMp/balance/', {headers: {'accept': 'application/json', 'X-API-Key': 'tWGtcgK6Z3DL30EqKtw984SzVLNGBbl5LUdPSGaZ1W8oWJelyrni7hPV8H672IUs'}});
        setData(response);
      } catch (error) {
        console.error(error)
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useGetsolanabalance;

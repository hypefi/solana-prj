import { FC } from "react";
// import { Table, Avatar, Tag } from "web3uikit";
import  axios  from "axios";
import { useEffect, useState } from "react";
import  useSolana  from "../hooks/useSolana";
import { useMoralis } from "react-moralis";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
var fetch = require('node-fetch');


const Tokens: FC = () => {
	const { authenticate, logout, isAuthenticated } = useMoralis();
	const { account } = useSolana();
	const [rerender, setRerender] = useState(false);
	const [rows, updateRows] = useState<any[]>([]);
	

	function createData(name: any, mint: any, amount: any) {
		return { name, mint, amount };
	}

	let numtok = 0;

	{/* let rows = []; */}

  {/* createData('token1', 159, 6.0 ), */}
  {/* createData('token2', 237, 9.0 ), */}
  {/* createData('token3', 262, 16.0), */}
	useEffect(() => {
	{/* 	console.log("effect"); */}


		let fetchData = async (account_: any) => {
			try {
				let url = "https://solana-gateway.moralis.io/account/devnet/" + account_ + "/tokens";

					fetch('http://api.testnet.solana.com', {
							method: 'POST',
							headers: {
									'Content-Type': 'application/json'
							},
							body: JSON.stringify(
						{
							"jsonrpc": "2.0",
							"id": 1,
							"method": "getProgramAccounts",
							"params": [
								"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
								{
									"encoding": "jsonParsed",
									"filters": [
										{
											"dataSize": 165
										},
										{
											"memcmp": {
												"offset": 32,
												"bytes": "HTJFiPE1BjZ5aAezu6MvfBoePCHna3LZnizkuxCBNZMp"
											}
										}
									]
								}
							]
						})
					}).then((res: any) => res.json())
					.then((jsonData: any) => {
					let m = jsonData.result;
					m.map((accounts: any) => {
					// console.log(accounts.account.data)
					let tok = accounts.account.data.parsed.info;
	
					{/* console.log(tok.mint) */}
					{/* console.log(tok.tokenAmount) */}
					numtok = numtok + 1;
					let tokenid = "token" + numtok; 
					{/* console.log(createData(tokenid, tok.mint, tok.tokenAmount.amount)) */}
					{/* rows.push() */}
					updateRows([...rows, createData(tokenid, tok.mint, tok.tokenAmount.amount)]);
					console.log(rows)
					})
					
					}
					)
					


			} catch (error) {
				console.error(error)
			}
			// setLoading(false);
		};

		fetchData(account).catch(console.error);
	}, [isAuthenticated]);




	return (
			<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell>Tokens</TableCell>
									<TableCell align="right">Mint</TableCell>
									<TableCell align="right">Amount</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{ console.log(rows) }
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.mint}</TableCell>
										<TableCell align="right">{row.amount}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
  		</TableContainer>
	);
};

export default Tokens;

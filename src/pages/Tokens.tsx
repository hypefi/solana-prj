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

function createData(name: any, calories: any, fat: any, carbs: any, protein: any) {
  return { name, calories, fat, carbs, protein };
}


	const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

	useEffect(() => {
		console.log("effect");


		const fetchData = async (account_: any) => {
			try {
				const url = "https://solana-gateway.moralis.io/account/devnet/" + account_ + "/tokens";

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

					console.log(tok.mint)
					console.log(tok.tokenAmount)

					}

					)
					});


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
									<TableCell>Dessert (100g serving)</TableCell>
									<TableCell align="right">Calories</TableCell>
									<TableCell align="right">Fat&nbsp;(g)</TableCell>
									<TableCell align="right">Carbs&nbsp;(g)</TableCell>
									<TableCell align="right">Protein&nbsp;(g)</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<TableCell component="th" scope="row">
											{row.name}
										</TableCell>
										<TableCell align="right">{row.calories}</TableCell>
										<TableCell align="right">{row.fat}</TableCell>
										<TableCell align="right">{row.carbs}</TableCell>
										<TableCell align="right">{row.protein}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
  		</TableContainer>
	);
};

export default Tokens;

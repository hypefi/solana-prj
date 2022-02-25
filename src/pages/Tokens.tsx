import { FC } from "react";
import { Table, Avatar, Tag } from "web3uikit";
import  axios  from "axios";
import { useEffect, useState } from "react";
import  useSolana  from "../hooks/useSolana";
import { useMoralis } from "react-moralis";
var fetch = require('node-fetch');





const Tokens: FC = () => {
	const { authenticate, logout, isAuthenticated } = useMoralis();
	const { account } = useSolana();




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
		<Table
			columnsConfig="80px 450px 450px 450px"
			data={[
				[
					<Avatar isRounded theme="image" />,
					"Moralis Magi",
					<Tag color="blue" text="Nft Collection" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"My Cool Nft",
					<Tag color="red" text="Lazy Nft" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Magi Cool Topen",
					<Tag color="yellow" text="Pack" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"My Marketplace",
					<Tag color="red" text="Nft Marketplace" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Owl Magi",
					<Tag color="purple" text="Bundle" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Owl Nft",
					<Tag color="green" text="Token" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Ape Yacht",
					<Tag color="blue" text="Nft Collection" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Charzard",
					<Tag color="red" text="Bundle" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Magi",
					<Tag color="green" text="Token" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Moralis Magi",
					<Tag color="blue" text="Nft Collection" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"My Cool Nft",
					<Tag color="red" text="Lazy Nft" />,
					"0x18...130e",
				],
				[
					<Avatar isRounded theme="image" />,
					"Magi Cool Topen",
					<Tag color="yellow" text="Pack" />,
					"0x18...130e",
				],
			]}
			header={["", <span>Name</span>, <span>Type</span>, ""]}
			maxPages={3}
			// onPageNumberChanged={function noRefCheck() {}}
			pageSize={5}
		/>
	);
};

export default Tokens;

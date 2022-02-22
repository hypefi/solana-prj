import { FC, useState } from "react";
import { useMoralis } from "react-moralis";
import { Typography } from "antd";
import { Logo, Button, getEllipsisTxt, Modal, Blockie } from "web3uikit";
import useSolana from "../hooks/useSolana";
// import useGetsolanabalance from "../hooks/useGetsolanabalance";


import axios from 'axios';
import { useEffect } from 'react';

const { Text } = Typography;

const AppBar: FC = () => {
	const { authenticate, logout, isAuthenticated } = useMoralis();
	const { account } = useSolana();
	const [balance, setBalance] = useState(0);
	const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);

	// const {
	// 	data,
	// 	loading,
	// } = useGetsolanabalance(account);

	/**
	 * @description
	 * Connecting to Solana supported wallets,
	 * currently only available with Phantom Wallet
	 */
	const onConnectWallet = async () => {
		try {
			await authenticate({
				// @ts-ignore
				type: "sol",
				onSuccess: async () => {
					console.log("Connected to Solana Wallet");
					// GET Request from solana Api 
					// to get the balance of the connected wallet
					//
					// console.log("Getting balance");
					// console.log("Balance: ", data);
					// console.log(account);
				},
			});
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
	};

	/**
	 * @description Logging out and disconnecting Solana Wallet
	 */
	const onDisconnectWallet = async () => {
		try {
			await logout();
		} catch (e) {
			// eslint-disable-next-line no-console
			console.error(e);
		}
	};


	useEffect(() => {
		console.log("effect");
		const fetchData = async (account_: any) => {
			try {
				const url = "https://solana-gateway.moralis.io/account/devnet/" + account_ + "/balance";
				console.log(url, account);
				const { data: response } = await axios.get(url, {headers: {'accept': 'application/json', 'X-API-Key': 'tWGtcgK6Z3DL30EqKtw984SzVLNGBbl5LUdPSGaZ1W8oWJelyrni7hPV8H672IUs'}});
				// setData(response);
				console.log(response);
				if(response) {
					console.log(response.solana.toString());
					setBalance(response.solana.toString());
				}
			} catch (error) {
				console.error(error)
			}
			// setLoading(false);
		};

		fetchData(account).catch(console.error);
	}, [isAuthenticated]);

	return (
		<>
			{isAuthenticated && isUserModalOpen && (
				<Modal
					cancelText="Disconnect Wallet"
					isVisible={isUserModalOpen}
					okText="Go to Explorer"
					onCancel={onDisconnectWallet}
					onOk={() => {}}
					title=""
				>
					<div />
					<div
						style={{
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Blockie seed={account} size={16} />
						<Text style={{ marginTop: "1rem" }}>{account}</Text>
					</div>
				</Modal>
			)}
			<div style={{ paddingTop: "1rem" }}>
				<Logo color="white" theme="icon" />
			</div>
			<Button
				id="test-button"
				onClick={isAuthenticated ? () => setIsUserModalOpen(true) : onConnectWallet}
				text={isAuthenticated ? getEllipsisTxt(account) : "Connect Wallet"}
				theme="secondary"
				type="button"
			/>
			<Button
				id="test-button"
				text={isAuthenticated ? balance.toString() + "  SOL"  : "Connect Wallet"}
				theme="secondary"
				type="button"
			/>
		</>
	);
};

export default AppBar;

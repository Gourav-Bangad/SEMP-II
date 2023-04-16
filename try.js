const { ethers } = require("ethers");

// create a provider
const provider = new ethers.providers.JsonRpcProvider("https://eth-goerli.g.alchemy.com/v2/6nNDF_yd8SvvqBRj4Gj8hjrxhtEZVr1B");

// set up the signer using the private key of the account that deployed the contract
const signer = new ethers.Wallet("778bce5ea3627e74e7136038def4a8329186504ab0ca64cd5fb63191dc1f0e96", provider);

// set up the contract interface and the contract instance using the ABI and the contract address
const abi = 
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "destination",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "source",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "seat",
				"type": "uint256"
			}
		],
		"name": "AddRide",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "phNo",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "AddUser",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			}
		],
		"name": "BookRide",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phNo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"name": "addUser",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "no_of_seat",
				"type": "uint256"
			}
		],
		"name": "bookRide",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "destination",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "source",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "seat",
				"type": "uint256"
			}
		],
		"name": "createRide",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			}
		],
		"name": "getRideDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rideOwner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rides",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "rideId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "destination",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "source",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "seat",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phNo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phNo",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = "0xc83458f11FD782Df6793605dD4EEEd28E026Dc16";
const carpoolContract = new ethers.Contract(contractAddress, abi, signer);


async function createRide(destination, source, price, seat) {
    const tx = await carpoolContract.createRide(destination, source, price, seat);
    // const rideId = tx.logs[0].args.rideid.toNumber();
    // const rideDetails = await carpoolContract.getRideDetails(rideId);
    // console.log("Ride ID:", rideId);
    // console.log("Ride Details:", rideDetails);
    console.log(tx);
}

async function addUser(name,phNo,age) {
    const tx = await carpoolContract.addUser(name,phNo,age);
    // const rideId = tx.logs[0].args.rideid.toNumber();
    // const rideDetails = await carpoolContract.getRideDetails(rideId);
    // console.log("Ride ID:", rideId);
    // console.log("Ride Details:", rideDetails);
    console.log(tx);
}

// addUser("Gourav","801010101",20);

createRide("Harvard", "Boston", 500, 3);


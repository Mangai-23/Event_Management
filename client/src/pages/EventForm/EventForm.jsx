import React, { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import Web3 from 'web3';
import './EventForm.css';
import Navbar from '../../components/Navbar/Navbar';

const EventForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        ticketPrice: 0,
        totalTickets: 0
    });
    const [account, setAccount] = useState('');
    const [connected, setConnected] = useState(false);
    const [web3, setWeb3] = useState(null);
    const [hash,setHash] =useState("");


    async function generateHash() {
        const timestamp = Date.now().toString(); 
        const combinedData = `${formData.name}${formData.location}${formData.ticketPrice}${formData.totalTickets}${timestamp}`;
        setHash(CryptoJS.SHA256(combinedData).toString());
    }

    useEffect(() => {
        const initWeb3 = async () => {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                const accounts = await web3Instance.eth.getAccounts();
                if (accounts.length > 0) {
                    setConnected(true);
                    setAccount(accounts[0]);
                }
            } else {
                console.log('MetaMask not installed');
            }
        };

        initWeb3();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleConnectWallet = async () => {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const userAccount = accounts[0];
            setAccount(userAccount);
            setConnected(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const YOUR_CONTRACT_ADDRESS = "0x6a28A688B688F16A3CD5288e89165D702Bfc7CAa";
        const YourContractABI =[
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_ticketPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_totalTickets",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "eveid",
                        "type": "string"
                    }
                ],
                "name": "createEvent",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "eventId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "organizer",
                        "type": "address"
                    }
                ],
                "name": "EventCreated",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_eventId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "part",
                        "type": "string"
                    }
                ],
                "name": "participantRegister",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_eventId",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_numTickets",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "p",
                        "type": "uint256"
                    }
                ],
                "name": "registerPay",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "payable",
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
                "name": "eve",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "eventid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "events",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "organizer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalTickets",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketsSold",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "eventid",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "_eventId",
                        "type": "string"
                    }
                ],
                "name": "getEventDetails",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "organizer",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "location",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketPrice",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalTickets",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "ticketsSold",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "internalType": "string",
                        "name": "eventid",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "part",
                        "type": "string"
                    }
                ],
                "name": "getParticipantDetails",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "participantAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "eventId",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "name": "participants",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "participantAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "eventId",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "participantId",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "totalEvents",
                "outputs": [
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
                "inputs": [],
                "name": "totalParticipants",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ]
        try {
            if (!web3) {
                console.error('Web3 not initialized');
                return;
            }

            // Load contract
            const contract = new web3.eth.Contract(YourContractABI, YOUR_CONTRACT_ADDRESS);
            await generateHash();
             console.log( hash);
            // Call contract method to create event
            const result = await contract.methods.createEvent(
                formData.name,
                formData.location,
                formData.ticketPrice,
                formData.totalTickets,
                hash
            ).send({ from: account });
            console.log(result);
            const d=await contract.methods.getEventDetails(hash).call();
            console.log(d);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="form-container">
                    <p className="form-title">Create Event</p>
                    <button className={connected ? 'form-submit connected' : 'connect-wallet'} onClick={connected ? null : handleConnectWallet}>
                        {connected ? 'Connected' : 'Connect Wallet'}
                    </button>
                    <form onSubmit={handleSubmit} className="form-start">
                        <div className="mb-4">
                            <label htmlFor="name" className="block">Event Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter event name" value={formData.name} onChange={handleChange} className="form-input" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="location" className="block">Location</label>
                            <input type="text" id="location" name="location" placeholder="Enter location" value={formData.location} onChange={handleChange} className="form-input" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ticketPrice" className="block">Ticket Price</label>
                            <input type="number" id="ticketPrice" name="ticketPrice" placeholder="Enter ticket price" value={formData.ticketPrice} onChange={handleChange} className="form-input" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="totalTickets" className="block">Total Tickets</label>
                            <input type="number" id="totalTickets" name="totalTickets" placeholder="Enter total tickets" value={formData.totalTickets} onChange={handleChange} className="form-input" />
                        </div>
                        <button type="submit" className="form-submit">Create Event</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EventForm;

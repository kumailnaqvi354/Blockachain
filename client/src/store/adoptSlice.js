import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Adoption from '../contracts/Adoption.json';
import Web3 from "web3";

export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async()=>{
        try {
            if(Web3.givenProvider){
                const web3 = new Web3 (Web3.givenProvider);
                //web3.eth
                await Web3.givenProvider.enable();

                const networkId = await web3.eth.net.getId();
                const network = Adoption.networks[networkId];
                const contract = new web3.eth.Contract(Adoption.abi,network.address);
                const addresses = await web3.eth.getAccounts();
                return {
                    web3,
                    contract: contract,
                    address: addresses[0]
                };
            }
            else {
                console.log("Error in loading web3");
            }
        }
        catch(error){
            console.log("Error in loading Blockchain = ",error);
        }
        
    }
)



const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
        contract: null,
        address: null,
       
    },
    reducers: {
        adopt: ()=>{

        }
    },
    extraReducers: {
        [initWeb3.fulfilled]: (state,action)=>{
            console.log("In fullfil = ",state);
            console.log("In fullfil = ",action);
            state.web3 = action.payload.web3;
            state.contract = action.payload.contract;
            state.address = action.payload.address;
        },
        
        
    }
})

export const adoptReducer = adoptSlice.reducer;
export const { adopt } = adoptSlice.actions;
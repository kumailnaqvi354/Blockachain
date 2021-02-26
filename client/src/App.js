import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initWeb3 } from './store/adoptSlice';

function App() {
  const dispatch = useDispatch();

  
  const web3 = useSelector((state)=>{
    console.log("state in app= ",state);
    return state.adoptReducer.web3
  })
 
  useEffect(()=>{
    dispatch(initWeb3());
  },[])

  return (
    <div>
      Hello Dapp web 3
      
    </div>
  );
}

export default App;
import {Route, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar/navbar';
import AllRoutes from './Routes';
import { useEffect } from 'react';
import { fetchAllQuestions } from './actions/question';
import { useDispatch } from 'react-redux';

function App() { 


  const dispatch =useDispatch()
  
  useEffect(() => {
    dispatch(fetchAllQuestions());
  }, [dispatch]);




  
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <AllRoutes/>
      </Router>
      
    </div>
  );
}

export default App;

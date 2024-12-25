
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import About from './components/pages/About/About';
import Info from './components/pages/Info/Info'
import Auth from './components/pages/Auth/Auth'
import Register from './components/pages/Register/Register';
import BestProposition from './components/pages/BestProposition/BestProposition';
import Objects from './components/pages/Objects/Objects';
import {TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';

import './App.css';
import FindObjects from './components/pages/FindObjects/FindObjects';
function App() {
  return (
    <TonConnectUIProvider manifestUrl="https://itstep-kursovaya.vercel.app/tonconnect-manifest.json" onError={(error) => {
      console.error("TonConnect Error:", error);
    }}>
           <Router>
      <Routes>
        <Route path="/" element={
          <>
          {/* <Auth/> */}
            {/* 
            <Info />
            <BestProposition />
            <TonConnectButton/> */}

            <FindObjects/>
            
           </>
        } />
        <Route path="/object/:id" element={<Objects />} />
      </Routes>
    </Router>
        </TonConnectUIProvider>
    
  );
}

export default App;

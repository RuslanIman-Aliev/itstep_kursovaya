import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import About from './components/pages/About/About';
import Info from './components/pages/Info/Info';
import Auth from './components/pages/Auth/Auth';
import Register from './components/pages/Register/Register';
import BestProposition from './components/pages/BestProposition/BestProposition';
import Objects from './components/pages/Objects/Objects';
import { TonConnectUIProvider, TonConnectButton } from '@tonconnect/ui-react';
import './App.css';
import FindObjects from './components/pages/FindObjects/FindObjects';
import ConfirmBookings from './components/pages/ConfirmBooking/ConfirmBooking';
import FinishBooking from './components/FinishBooking/FinishBooking';
import NavBars from './components/layouts/NavBars/NavBars';
import NewObject from './components/pages/NewObject/NewObject';
import UserActions from './components/pages/UserActions/UserActions';
import BookingsTable from './components/pages/UserActions/BookingTable';
import RoomList from './components/pages/Adminer/Adminer';
  
function App() {
  return (
       <TonConnectUIProvider
        manifestUrl="https://itstep-kursovaya.vercel.app/tonconnect-manifest.json"
        onError={(error) => {
          console.error('TonConnect Error:', error);
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={ <PageWithNavBars>  <About /><Info /><BestProposition /></PageWithNavBars>
                
              }
            />
            <Route path="/add" element={<PageWithNavBars><NewObject/></PageWithNavBars> }/>
            <Route path="/object/:id" element={<PageWithNavBars><Objects /></PageWithNavBars>}/>
            <Route path="/objects/:type" element={<PageWithNavBars><UserActions /></PageWithNavBars>}/>
            <Route path="/objectbook/:role" element={<PageWithNavBars><BookingsTable /></PageWithNavBars>}/>
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/list" element={<PageWithNavBars><FindObjects /></PageWithNavBars>}/>
            <Route path="/confirm"element={<PageWithNavBars><ConfirmBookings /></PageWithNavBars>}/>
            <Route path="/finishbooking" element={<FinishBooking /> }/>
            <Route path="/adminer" element={<RoomList /> }/>

          </Routes>
        </Router>
      </TonConnectUIProvider>
   );
}

function PageWithNavBars({ children }) {
  const location = useLocation();
  if (location.pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <>
      <NavBars />
      {children}
    </>
  );
}

export default App;

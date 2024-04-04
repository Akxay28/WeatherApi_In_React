import { Route, Routes } from 'react-router-dom';
import { CityProvider } from './Context/CityContext';
import './App.css';
import Card from './Components/Card';
import Navbar from './Components/Navbar';

function App() {
  return (
    <CityProvider>
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Card />} />
        </Routes>
      </div>
    </CityProvider>
  );
}

export default App;
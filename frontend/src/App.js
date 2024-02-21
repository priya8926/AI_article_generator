import './App.css';
import Main_content from './components/Main_content';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Subscription from './components/Subscription';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main_content />} />
          <Route path="/subscription" element={<Subscription />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

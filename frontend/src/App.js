import './App.css';
import Main_content from './components/Main_content';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Subscription from './components/Subscription';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Error from './components/Error'
import PaymentSuccess from './components/PaymentSuccess';
import History from './components/History';
import GetArticleHistory from './components/GetArticleHistory';
import SaveArticle from './components/SaveArticle';


function App() {

  return (
    <>
     
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/home" element={<Main_content />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path='/history' element = {<History/>} />
          <Route path='/getarticle/:id' element = {<GetArticleHistory/>} />
          <Route path='/category/:id' element = {<SaveArticle/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/paymentsuccess' element={<PaymentSuccess />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='*' element={<Error />} />
        </Routes>
    </>
  );
}

export default App;

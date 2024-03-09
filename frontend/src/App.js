import './App.css';
import Main_content from './components/Main_content';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Subscription from './components/Subscription';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import PaymentSuccess from './components/PaymentSuccess';
import History from './components/History';
import GetArticleHistory from './components/GetArticleHistory';
import SaveArticle from './components/SaveArticle';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Layout/Footer'
import About from './components/About'
import Contact from './components/Contact'
import Service from './components/Service'
// import Faq from './components/Faq';

function App() {

  return (
    <>

      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/home" element={<Main_content />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path='/history' element={<History />} />
        <Route path='/getarticle/:id' element={<GetArticleHistory/>} />
        <Route path='/category/:id' element={<SaveArticle />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/services' element={<Service />} />
        {/* <Route path='/faqs' element={<Faq/>} /> */}
        <Route path='/paymentsuccess' element={<PaymentSuccess />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home/home';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';



const App = () => {
  return (
    <>
      <BrowserRouter>
      
      <Header/>
      
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;

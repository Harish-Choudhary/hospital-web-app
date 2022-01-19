import "./app.css";
import { AuthPage } from "./pages/auth/auth.page";
import {Routes,Route} from 'react-router-dom';
import {HomePage} from './pages/home/home'
export const App = ()=> {
  
  return (
    <>
    <Routes>
      <Route path='/signup' element={<AuthPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      {/* <Route path='/' element={<HomePage></HomePage>}></Route> */}
    </Routes>
    </>
  );
}


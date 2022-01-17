import "./app.css";
import { AuthPage } from "./pages/auth/auth.page";
import {Routes,Route} from 'react-router-dom'
export const App = ()=> {
  
  return (
    <>
    <Routes>
      <Route path='/signup' element={<AuthPage/>}/>
      {/* <Route path='/' element={<HomePage></HomePage>}></Route> */}
    </Routes>
    </>
  );
}


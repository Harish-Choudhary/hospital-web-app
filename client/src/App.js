import "./app.css";
import { AuthPage } from "./pages/auth/user.auth/auth.page";
import {Routes,Route} from 'react-router-dom';
import {HomePage} from './pages/home/home'
import {AdminSignUpPage} from './pages/auth/admin.auth/admin.auth';
import {AdminHomePage} from './pages/admin/adminHome/AdminHomePage';
import { AddDoctor } from "./pages/admin/addDoctor/addDoctor";
export const App = ()=> {
  
  return (
    <>
    <Routes>
      <Route path='/signup' element={<AuthPage/>}/>
      <Route path='/' element={<HomePage/>}/>
      {/* <Route path='/' element={<HomePage></HomePage>}></Route> */}
      <Route path='/register/hospital' element={<AdminSignUpPage/>}/>
      <Route path = '/dashboard/hospital' element={<AdminHomePage/>} />
      
    </Routes>
    </>
  );
}


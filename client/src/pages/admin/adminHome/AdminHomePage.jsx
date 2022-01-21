import React from 'react';
import { SideBar } from '../../../components/admin/sidebar/admin.sidebar';
import { Dashboard } from '../../../components/dashboard/dashboard';
import './AdminHomePage.css'
export const AdminHomePage = () => {
  return (
    <div className="homePage">
              <div className='sidebar'>
                  <SideBar/>

              </div>

              <div className = "dashBoardDiv"> 
              <Dashboard/>
              </div>
    </div>
  );
}
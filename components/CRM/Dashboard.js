import React from 'react';
import AdminDashboard from './dashboards/AdminDashboard';
import DigitalMarketDashboard from './dashboards/DigitalMarketDashboard';

export default function Dashboard() {
  const role = localStorage.getItem('crmrole');
  
  console.log("Current Role:", role);

  let dashboardComponent;
  if (role === '0') {
    dashboardComponent = <AdminDashboard />;
  } else if (role === '5') {
    dashboardComponent = <DigitalMarketDashboard />;
  } else {
    dashboardComponent = <div>Role not recognized</div>;
  }

  return (
    <div>
      {dashboardComponent}
    </div>
  );
}

import './index.css';

import React, { useEffect, useState } from 'react';

import Footer from './components/Footer';
import Routes from '../src/components/Routes';
import SideNavigation from './components/sideNavigation';
import TopNavigation from './components/topNavigation';

const App = () => {
  const [accountConfiguration, setAccountConfiguration] = useState({
    monthlyGoalPerc: 300,
    weeklyGoalPerc: 50,
    suggestedLotSizes: 0.05,
    stopLoss: 2,
    initialAmount: 100,
  });
  const [account, setAccount] = useState({
    total: 547.21,
    initialMonthValue: 300,
  });

  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem('forexinvestmentdashboard_sessions')) || [
      {},
    ]
  );
  useEffect(() => {
    localStorage.setItem(
      'forexinvestmentdashboard_sessions',
      JSON.stringify(
        sessions.length > 1 ? sessions.filter(session => session.id) : sessions
      )
    );
  }, [sessions]);
  return (
    <div className="flexible-content">
      {/* <TopNavigation /> */}
      <SideNavigation />
      <main id="content" className="p-5">
        {JSON.stringify(sessions)}
        <Routes
          setAccountConfiguration={setAccountConfiguration}
          accountConfiguration={accountConfiguration}
          setAccount={setAccount}
          account={account}
          setSessions={setSessions}
          sessions={sessions}
        />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
export default App;

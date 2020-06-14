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
    suggestedLotSizes: 0.02,
    stopLoss: 2,
    initialAmount: 100,
    targetTransactionsPerWeek: 75,
  });

  const catalogues = {
    reasonsOfLoss: [
      { value: 0, text: 'Not Set' },
      { value: 1, text: 'Enterded by myself' },
      { value: 2, text: 'Wrong time' },
      { value: 3, text: 'Put instead of call(and viceversa)' },
      { value: 4, text: 'Rage operation' },
      { value: 5, text: 'wrong pair' },
      { value: 6, text: 'Chained mistake' },
      { value: 7, text: 'Entered a second time on the same analysis' },
      { value: 8, text: 'Market' },
    ],
    facilitators: [
      { value: 0, text: 'Bank Transaction' },
      { value: 1, text: 'Jhan Carlos' },
      { value: 2, text: 'Silvia Gonzalez' },
      { value: 3, text: 'Hugo Gomez' },
    ],
  };

  const [account, setAccount] = useState({
    total: 547.21,
    initialMonthValue: 300,
  });

  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem('forexinvestmentdashboard_sessions')) || [
      {},
    ]
  );
  const [instructors, setInstructors] = useState(
    JSON.parse(
      localStorage.getItem('forexinvestmentdashboard_instructors')
    ) || [{}]
  );
  useEffect(() => {
    localStorage.setItem(
      'forexinvestmentdashboard_sessions',
      JSON.stringify(
        sessions.length > 1 ? sessions.filter(session => session.id) : sessions
      )
    );

    console.log(sessions);
  }, [sessions]);
  return (
    <div className="flexible-content">
      {/* <TopNavigation /> */}
      <SideNavigation />
      <main id="content" className="p-5">
        <Routes
          catalogues={catalogues}
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

import './index.css';

import React, { useEffect, useState } from 'react';

// import Footer from './components/Footer';
import Routes from '../src/components/Routes';
import SideNavigation from './components/sideNavigation';

// import TopNavigation from './components/topNavigation';

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [accountConfiguration, setAccountConfiguration] = useState({
    monthlyGoalPerc: 300,
    weeklyGoalPerc: 10,
    suggestedLotSizes: 1.5,
    sessionTarget: 2.5,
    stopLoss: 2,
    initialAmount: 100,
    targetTransactionsPerWeek: 20,
  });

  const catalogues = {
    reasonsOfLoss: [
      { value: 0, text: 'Not Set', shortText: 'N/A' },
      { value: 1, text: 'Market', shortText: 'mkt' },
      { value: 2, text: 'Enterded by myself', shortText: 'myself' },
      { value: 3, text: 'Rage operation', shortText: 'rage' },
      {
        value: 4,
        text: 'Entered a second time on the same analysis',
        shortText: 're-enter',
      },
      { value: 5, text: 'Wrong time', shortText: 'time' },
      {
        value: 6,
        text: 'Put instead of call(and viceversa)',
        shortText: 'call/put',
      },
      { value: 7, text: 'wrong pair', shortText: 'pair' },
      { value: 8, text: 'Chained mistake', shortText: 'chained' },
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
    // eslint-disable-next-line no-undef
    JSON.parse(localStorage.getItem('forexinvestmentdashboard_sessions')) || [
      {},
    ]
  );
  // eslint-disable-next-line no-unused-vars
  const [instructors, setInstructors] = useState(
    JSON.parse(
      // eslint-disable-next-line no-undef
      localStorage.getItem('forexinvestmentdashboard_instructors')
    ) || [{}]
  );
  useEffect(() => {
    // eslint-disable-next-line no-undef
    localStorage.setItem(
      'forexinvestmentdashboard_sessions',
      JSON.stringify(
        sessions.length > 1 ? sessions.filter(session => session.id) : sessions
      )
    );
    // eslint-disable-next-line no-console, no-undef
    console.info(sessions);
  }, [sessions]);
  return (
    <div className="flexible-content">
      {/* <TopNavigation /> */}
      <SideNavigation />
      <main id="content" className="p-5">
        <Routes
          catalogues={catalogues}
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

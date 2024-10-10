import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Error } from './pages/Error';

import { PATHS } from './shared/routes';
import { Header } from './widgets/header/Header';

const routes = Object.entries(PATHS).map(([key, value]) => (
  <Route key={key} path={value.path} element={value.component} />
));

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        {routes}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;

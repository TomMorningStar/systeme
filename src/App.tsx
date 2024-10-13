import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import { api } from './api/getData';
import { EntityTable } from './pages/EntityTable';
import { Error } from './pages/Error';
import type { IEntityTable } from './shared/types';
import { Header } from './widgets/header/Header';

const App: React.FC = () => {
  const [routes, setRoutes] = React.useState<IEntityTable[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api
      .get('/entity-table')
      .then((data) => {
        setRoutes(data);
      })
      .catch((err: Error) => {
        // eslint-disable-next-line no-console
        console.log(err);
        setRoutes([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (routes.length === 0) {
    return <div>No routes</div>;
  }

  const initRoutes = routes.map((value) => (
    <Route key={value.id} path={value.path} element={<EntityTable />} />
  ));

  return (
    <Router>
      <AppContent routes={routes} initRoutes={initRoutes} />
    </Router>
  );
};

const AppContent: React.FC<{ routes: IEntityTable[]; initRoutes: JSX.Element[] }> = ({
  routes,
  initRoutes,
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (pathname === '/') {
      navigate('/products/1');
    }
  }, [navigate, pathname]);

  return (
    <>
      <Header routes={routes} />
      <Routes>
        {initRoutes}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;

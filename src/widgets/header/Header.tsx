import { Link } from 'react-router-dom';
import { PATHS } from '../../shared/routes';

const links = Object.entries(PATHS).map(([key, value]) => (
  <Link key={key} to={value.path} style={{ marginRight: '10px' }}>
    {value.label}
  </Link>
));

export const Header = () => {
  return (
    <header>
      <nav style={{ marginBottom: '20px' }}>{links}</nav>
    </header>
  );
};

import Pages from '../pages/Pages';
import PricePlans from '../pages/PricePlans';
import Products from '../pages/Products';

export const PATHS = {
  PRODUCTS: {
    path: '/',
    label: 'Products',
    component: <Products />,
  },
  PRICES: {
    path: '/price-plans',
    label: 'Price Plans',
    component: <PricePlans />,
  },
  PAGES: {
    path: '/pages',
    label: 'Pages',
    component: <Pages />,
  },
};

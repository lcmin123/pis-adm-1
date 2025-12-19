import TanstackQueryProvider from './TanstackQueryProvider';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@routes/router';

const RootProvider = () => {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
  );
};

export default RootProvider;

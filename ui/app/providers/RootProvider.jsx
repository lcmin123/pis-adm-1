import TanstackQueryProvider from './TanstackQueryProvider';
import { RouterProvider } from '@tanstack/react-router';
import { router } from '@app/router';

const RootProvider = () => {
  return (
    <TanstackQueryProvider>
      <RouterProvider router={router} />
    </TanstackQueryProvider>
  );
};

export default RootProvider;

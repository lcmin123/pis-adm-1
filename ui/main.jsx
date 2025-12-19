import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RootProvider from '@app/providers/RootProvider';
import '@shared/styles/normalize.css';
import '@shared/styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RootProvider />
  </StrictMode>
);

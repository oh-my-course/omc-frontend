import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import { Wrapper } from '@/shared/components';
import { QueryClientProvider } from './core/query';
import { router } from './core/routes';
import GlobalStyle from './shared/styles/GlobalStyle';
import './main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider>
        <Wrapper>
          <GlobalStyle />
          <RouterProvider router={router} />
        </Wrapper>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

import {
  cleanup,
  render,
  waitFor,
  screen,
  fireEvent,
  act,
  getByText,
} from '@testing-library/react';

import * as axios from 'axios';

import App from 'App';
import ErrorBoundary from 'components/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from 'hooks/useAuth';
import { ToastProvider } from 'hooks/useToast';
import { fetchGames } from 'api/fetchGames';

/*const MockApp = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

jest.mock('axios');

describe('App', () => {
  it('Should change to next or previous page after pressing arrow', async () => {
    await act (async () => {
      render(<MockApp />)
    })
    await waitFor(() => {
      expect(screen.getByText(/Teamfight Tactics/i)).toBeInTheDocument();
      fireEvent.click(screen.getByText(/Teamfight Tactics/i));
      expect(screen.getByText(/Genre/i)).toBeInTheDocument();
      screen.debug();
    })
  });
});
*/

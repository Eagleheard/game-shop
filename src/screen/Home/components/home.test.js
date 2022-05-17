import { cleanup, fireEvent, queryByTestId, render, waitFor, screen, act} from '@testing-library/react';

import { Preview } from 'components';
import { ToastProvider } from 'hooks/useToast';
import { Home } from '.';

describe('Home', () => {
    it('Should change to next or previous page after pressing arrow', async () => {
        await act(async () => { 
          render(<ToastProvider><Preview/></ToastProvider>);
        })
        waitFor(() => {
            let currentPage = 0;
            const nextBtn = screen.getByTestId('next-btn');
            const prevBtn = screen.getByTestId('prev-btn');
        
            fireEvent.click(nextBtn);
            currentPage += 1;
            expect(screen.findByTestId(`preview-${currentPage - 1}`)).not.toHaveClass('preview__img--active');
            expect(screen.findByTestId(`preview-${currentPage}`)).toHaveClass('preview__img--active');
        
            fireEvent.click(prevBtn);
            currentPage -= 1;
            expect(screen.findByTestId(`preview-${currentPage + 1}`)).not.toHaveClass('preview__img--active');
            expect(screen.findByTestId(`preview-${currentPage}`)).toHaveClass('preview__img--active');
        })
      })
    })
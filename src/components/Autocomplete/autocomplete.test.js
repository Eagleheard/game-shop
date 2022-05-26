import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';

import { Autocomplete } from '.';

afterEach(cleanup);

const optionsList = ['abc', 'Vlad', 'Game', 'It Takes Two'];
describe('Autocomplete', () => {
  const { getByTestId, getByText } = render(<Autocomplete options={optionsList} name="Games" />);
  const input = getByTestId('autocomplete');
  it('Should open list if user start writting', () => {
    fireEvent.change(input, { target: { value: '23' } });
    waitFor(() => expect(input.value).toBe('$23'));
    expect(getByText('Not found')).toBeInTheDocument();
  });

  it('Should open list with suggestion if user start write corrent word', () => {
    fireEvent.change(input, { target: { value: 'abc' } });
    waitFor(() => {
      expect(input.value).toBe('$abc');
      expect(getByText('abc')).toBeInTheDocument();
      expect(getByText('Not found')).toBeInTheDocument();
    });
  });
});

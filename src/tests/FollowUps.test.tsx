import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FollowUpsTable from '../components/followUps/ListfollowUps';
import TestApp from './testApp';

describe('FollowUpsTable Component', () => {
  test('renders loading state correctly', () => {
    render(<TestApp><FollowUpsTable /></TestApp>);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('navigates to opportunity details page when a row is clicked', async () => {
    render(<TestApp><FollowUpsTable /></TestApp>);

    await waitFor(() => {
        const row = screen.getByTestId('fu-1')
        fireEvent.click(row);
        expect(window.location.pathname).toBe('/opportunityDetails/op-1-1');
    })
  });
});

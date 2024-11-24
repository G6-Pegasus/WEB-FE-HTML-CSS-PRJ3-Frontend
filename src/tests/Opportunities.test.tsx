import { render, screen, waitFor  } from '@testing-library/react';
import '@testing-library/jest-dom';
import OpportunityTable from '../components/opportunities/ListOpportunities';
import TestApp from './testApp';

describe('OpportunityTable Component', () => {
  test('renders opportunity details', async () => {
    render(<TestApp><OpportunityTable /></TestApp>);

    await waitFor(() => {
        expect(screen.getByTestId('op-1-1')).toBeInTheDocument()
    })
  });

  test('renders loading state correctly', () => {
    render(<TestApp><OpportunityTable /></TestApp>);

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});

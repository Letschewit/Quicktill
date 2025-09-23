import { render } from '@testing-library/react';
import App from './App.jsx';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
  });
});

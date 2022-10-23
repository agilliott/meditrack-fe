import { render, screen } from '../test/test-utils';
import Analyse from './Analyse';

describe('<Analyse />', () => {
  it('renders', () => {
    render(<Analyse />);
    expect(screen.getByText(/Analyse/i)).toBeInTheDocument();
    expect(screen.getByText(/Coming soon/i)).toBeInTheDocument();
  });
});

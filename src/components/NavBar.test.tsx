import { render, screen } from '../test/test-utils';
import NavBar from './NavBar';

describe('</NavBar />', () => {
  it('renders', () => {
    render(<NavBar />);
    expect(screen.getByRole('link', { name: /Tracker/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Analyse/i })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Medication/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Profile/i })).toBeInTheDocument();
  });
});

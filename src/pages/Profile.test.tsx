import { render, screen } from '../test/test-utils';
import Profile from './Profile';

describe('<Profile />', () => {
  it('renders', () => {
    render(<Profile />);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /log out/i })
    ).toBeInTheDocument();
  });
});

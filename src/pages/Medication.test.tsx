import { render, screen } from '../test/test-utils';
import Medication from './Medication';

describe('<Medication />', () => {
  it('renders', () => {
    render(<Medication />);
    expect(screen.getByText(/Medication/)).toBeInTheDocument();
  });
});

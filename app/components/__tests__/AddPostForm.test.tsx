import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { AddPostForm } from '../AddPostForm';
describe('AddPostForm', () => {
  test('should render correctly', async () => {
    const consoleSpy = vi.spyOn(console, 'info');
    const user = userEvent.setup();
    render(<AddPostForm />);

    expect(screen.getByText('Add Post')).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText('Title');
    const bodyInput = screen.getByPlaceholderText('Body');
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const submitButton = screen.getByRole('button', { name: 'Add Post' });

    await user.type(titleInput, 'Test Title');
    await user.type(bodyInput, 'Test Body');
    await user.type(firstNameInput, 'Test First Name');
    await user.type(lastNameInput, 'Test Last Name');

    await user.click(submitButton);

    expect(consoleSpy).toHaveBeenCalledWith('Sending message to server');
  });
});

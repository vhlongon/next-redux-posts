import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { Drawer } from '../Drawer';
describe('Drawer', () => {
  test('should render content when open', () => {
    const onClose = vi.fn();

    render(
      <Drawer isOpen onClose={onClose}>
        content
      </Drawer>
    );

    expect(screen.getByTestId('drawer')).toBeVisible();
  });

  test('should not render content when closed', () => {
    const onClose = vi.fn();

    render(
      <Drawer isOpen={false} onClose={onClose}>
        content
      </Drawer>
    );

    expect(screen.queryByTestId('drawer')).not.toBeVisible();
  });

  test('should call onClose when close button is clicked', async () => {
    const onClose = vi.fn();

    render(
      <Drawer isOpen onClose={onClose}>
        content
      </Drawer>
    );

    await userEvent.click(screen.getByText('Close'));

    expect(onClose).toHaveBeenCalled();
  });
});

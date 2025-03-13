import StyledComponentsRegistry from '@/lib/registry';
import { render } from '@/test/utils';
import styled from 'styled-components';

describe('StyledComponentsRegistry', () => {
  test('should render children and properly manage styled-components styles in client-side', () => {
    const StyledDiv = styled.div`
      font-size: 100px;
    `;

    const { container } = render(
      <StyledComponentsRegistry>
        <StyledDiv data-testid="styled-element">styled content</StyledDiv>
      </StyledComponentsRegistry>
    );

    expect(container.firstChild).toHaveStyle('font-size: 100px');
  });
});

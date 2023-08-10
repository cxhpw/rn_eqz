import { render, screen, fireEvent } from '@testing-library/react-native';

import Index from '../index';

test('是否包含某些文字', async () => {
  console.warn = jest.fn();
  render(<Index />);
  fireEvent.press(screen.getByText('Increment value'));
  const outputText = await screen.findByTestId('fuck');
  expect(outputText).toHaveTextContent('2');
});

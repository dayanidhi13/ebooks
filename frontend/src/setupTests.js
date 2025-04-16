// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders search input', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/Enter book title/i);
    expect(inputElement).toBeInTheDocument();
});

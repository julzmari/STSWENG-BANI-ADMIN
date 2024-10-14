import { render, screen, fireEvent } from '@testing-library/react'; 
import Login from '../Login';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock'; 

const localStorageMock = (() => {
  let store: Record<string, string> = {}; 
  return {
    getItem: (key: string) => store[key] || null, 
    setItem: (key: string, value: string) => {
      store[key] = value; 
    },
    clear: () => {
      store = {}; 
    },
  };
})();


Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});


beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders login form', () => {
  render(<Login />); 

  // check if the username and password input fields + login button are present
  const usernameInput = screen.getByLabelText(/Username/i);
  const passwordInput = screen.getByLabelText(/Password/i);
  const loginButton = screen.getByRole('button', { name: /Login/i });

  // Assert that the elements are found
  expect(usernameInput).not.toBeNull();
  expect(passwordInput).not.toBeNull();
  expect(loginButton).not.toBeNull();
});

test('handles successful login', async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ token: 'mockToken' }));

  render(<Login />); 

  //simulate typing values
  fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByRole('button', { name: /Login/i }));

  expect(fetchMock).toHaveBeenCalledWith('/api/login', expect.anything());
  expect(localStorage.getItem('authToken')).toBe('mockToken');

  //check if it redirects to the main page
  expect(window.location.href).toBe('/');
});
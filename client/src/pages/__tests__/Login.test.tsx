import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; 
import Login from '../Login';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock'; 
fetchMock.enableMocks();

//node env
global.window = {} as any;

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
  fireEvent.change(screen.getByPlaceholderText('Enter your username'), { target: { value: 'Leomarc' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'happyhappy' } });
  fireEvent.submit(screen.getByTestId('login-form'));


  //5 seconds timer: With('http://localhost:3000/api/login', expect.anything()), { timeout: 5000 })
  await waitFor(() => expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/login', expect.anything()), { timeout: 5000 });
  await waitFor(() => expect(localStorage.getItem('authToken')).toBe('mockToken'));

  // check if redirects to main page
  await waitFor(() => expect(window.location.href).toBe('http://localhost/'));
});
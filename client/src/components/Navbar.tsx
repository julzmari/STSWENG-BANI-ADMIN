import { Container, Group, Image } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Navbar.module.css';

const links = [
  { link: '/', label: 'Dashboard' },
  { link: '/pastreservations', label: 'Reservation History' },
  { link: '/rooms', label: 'Rooms' },
  { link: '/logout', label: 'Log Out' },
];

export function Navbar() {
  const location = useLocation(); // Get current location
  const [active, setActive] = useState(location.pathname); // Initialize active state
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');
  };

  useEffect(() => {
    // Check if the authToken is present in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login'); // Redirect to login if not authenticated
    }

    // Update the active link whenever the location changes
    setActive(location.pathname);
  }, [location.pathname]);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        if (link.link === '/logout') {
          handleLogout(); 
        } else {
          setActive(link.link);
          navigate(link.link);
        }
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image 
          src={'./images/navbar-logo.png'} 
          h={'70'} 
          style={{ marginRight: 'auto' }}
        />
        {/* Only show the links if authenticated */}
        {isAuthenticated && (
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
        )}
      </Container>
    </header>
  );
}

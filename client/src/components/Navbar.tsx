import { useEffect, useState } from 'react';
import { Container, Group } from '@mantine/core';
import classes from './Navbar.module.css';
import { Image } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const links = [
  { link: '/', label: 'Dashboard' },
  { link: '/pastreservations', label: 'Reservation History' },
  { link: '/rooms', label: 'Rooms' },
  { link: '/logout', label: 'Log Out' },
];

export function Navbar() {
  const location = useLocation(); // Get current location
  const [active, setActive] = useState(location.pathname); // Initialize active state

  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

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

  useEffect(() => {
    // Update the active link whenever the location changes
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image src={'./images/navbar-logo.png'} h={'70'} />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
      </Container>
    </header>
  );
}

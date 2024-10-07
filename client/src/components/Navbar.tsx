import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { Image } from '@mantine/core';

//lmrc
import { useNavigate } from 'react-router-dom';
//lmrc

const links = [
  { link: '/', label: 'Dashboard' },
  { link: '/allreservations', label: 'Reservation History' },
  { link: '/rooms', label: 'Rooms' },
  { link: '/logout', label: 'Log Out' },
];

export function Navbar() {

  const [active, setActive] = useState(links[0].link);

  //lmrc
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  //lmrc


  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        // replacing - setActive(link.link); lmrc
        if (link.link === '/logout') {
          handleLogout(); 
        } else {
          setActive(link.link);
          navigate(link.link);  // Use navigate to switch pages lmrc
        }
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image src={'./images/navbar-logo.png'} h={'70'}/>
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

      </Container>
    </header>
  );
}
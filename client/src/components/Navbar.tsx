import { useState } from 'react';
import { Container, Group, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Navbar.module.css';
import { Image } from '@mantine/core';

const links = [
  { link: '/', label: 'Dashboard' },
  { link: '/allreservations', label: 'All Reservations' },
  { link: '/rooms', label: 'Rooms' },
  { link: '/logout', label: 'Log Out' },
];

export function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
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
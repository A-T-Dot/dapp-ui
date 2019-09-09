import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../castor.svg';

export function NavBar() {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  useEffect(() => {
    setActiveItem(window.location.pathname.slice(1).split('/').pop());
  }, []);

  return (
    <Menu>
      <Menu.Item>
        <img src={logo} alt='logo' />
      </Menu.Item>
      <Menu.Item as={Link} to='/t1'
        name='t1'
        color='blue'
        active={activeItem === 't1'}
        onClick={handleItemClick}
      >
        t1
        </Menu.Item>
      <Menu.Item as={Link} to='/t2'
        name='t2'
        color='blue'
        active={activeItem === 't2'}
        onClick={handleItemClick}
      >
        t2
        </Menu.Item>
    </Menu>
  )
}
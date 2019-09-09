import React, { useState, useEffect } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import logo from '../castor.svg';

export function NavBar () {
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
      <Menu.Item as={Link} to='/content'
        name='content'
        color='blue'
        active={activeItem === 'content'}
        onClick={handleItemClick}
      >
        My Content
      </Menu.Item>
      <Menu.Item as={Link} to='/governance'
        name='governance'
        color='blue'
        active={activeItem === 'governance'}
        onClick={handleItemClick}
      >
        Governance
      </Menu.Item>
      <Menu.Item as={Link} to='/discover'
        name='discover'
        color='blue'
        active={activeItem === 'discover'}
        onClick={handleItemClick}
      >
        Discover
      </Menu.Item>
    </Menu>
  )
}
import React, { useState } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../../app';
import { roots } from '../../services/constants';

interface NavbarProps {
  title?: string;
  showBtn?: boolean;
  screenName?: string;
  onSelectItem?(type: string): void;
}

const Navbar: React.FC<NavbarProps> = ({ title, showBtn, onSelectItem, screenName }) => {
  const auth = useAuth();

  const [anchorEls, setAnchorEls] = useState({
    login: null,
    reports: null,
  });

  const handleClick = (name: string) => event => {
    setAnchorEls({ ...anchorEls, [name]: event.currentTarget });
  };

  const handleClose = (name: string) => () => {
    setAnchorEls({ ...anchorEls, [name]: null });
  };

  const handleItem = (event, name) => {
    onSelectItem?.(event.target.dataset.type);
    handleClose(name)();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton aria-label="menu" color="inherit" edge="start">
          {showBtn ? <MenuIcon aria-controls="reports-menu" aria-haspopup="true" onClick={handleClick('reports')} /> : null}
          <Menu
            keepMounted
            TransitionComponent={Fade}
            anchorEl={anchorEls.reports}
            id="reports-menu"
            open={Boolean(anchorEls.reports)}
            onClose={handleClose('reports')}
          >
            {roots.map(item => (
              <Link key={item.url} to={`/report/${item.url}`}>
                <MenuItem data-type={item.url} onClick={e => handleItem(e, 'reports')}>
                  {item.name}
                </MenuItem>
              </Link>
            ))}
          </Menu>
        </IconButton>
        <Typography variant="h6">{title}</Typography>
        {showBtn ? (
          <Button aria-controls="login-menu" aria-haspopup="true" color="inherit" onClick={handleClick('login')}>
            {screenName}
          </Button>
        ) : null}
        <Menu
          keepMounted
          TransitionComponent={Fade}
          anchorEl={anchorEls.login}
          id="login-menu"
          open={Boolean(anchorEls.login)}
          onClose={handleClose('login')}
        >
          <MenuItem data-type="account" onClick={e => handleItem(e, 'login')}>
            Аккаунт
          </MenuItem>
          <MenuItem data-type="logout" onClick={auth.signOut}>
            Выйти
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);

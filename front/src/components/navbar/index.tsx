import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Fade } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { useAuth } from '../../App';
import { roots } from '../../services/constants';
import { useStyles } from './style';

const Navbar = ({ title, showBtn, onSelectItem, name }) => {
  const classes = useStyles();
  const auth = useAuth();

  const [anchorEls, setAnchorEls] = useState({
    login: null,
    reports: null,
  });

  const handleClick = name => event => {
    setAnchorEls({ ...anchorEls, [name]: event.currentTarget });
  };

  const handleItem = (event, name) => {
    onSelectItem(event.target.dataset.type);
    handleClose(name)();
  };

  const handleClose = name => () => {
    setAnchorEls({ ...anchorEls, [name]: null });
  };

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton aria-label="menu" className={classes.menuButton} color="inherit" edge="start">
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
        <Typography className={classes.title} variant="h6">
          {title}
        </Typography>
        {showBtn ? (
          <Button aria-controls="login-menu" aria-haspopup="true" color="inherit" onClick={handleClick('login')}>
            {name}
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

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Fade } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { roots } from '../../services/constants';
import { getCookie } from '../../services/common';
import { useAuth } from '../../App';

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
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          {showBtn
            ? <MenuIcon aria-controls="reports-menu" aria-haspopup="true" onClick={handleClick('reports')}/>
            : null}
          <Menu
            id="reports-menu"
            anchorEl={anchorEls.reports}
            keepMounted
            open={Boolean(anchorEls.reports)}
            onClose={handleClose('reports')}
            TransitionComponent={Fade}
          >
            {roots.map(item => {
              return (
                <Link to={`/report/${item.url}`} key={item.url}>
                  <MenuItem data-type={item.url} onClick={e => handleItem(e, 'reports')}>{item.name}</MenuItem>
                </Link>
              );
            })}

          </Menu>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {showBtn
          ? (
            <Button color="inherit" aria-controls="login-menu" aria-haspopup="true" onClick={handleClick('login')}>
              {name}
            </Button>)
          : null}
        <Menu
          id="login-menu"
          anchorEl={anchorEls.login}
          keepMounted
          open={Boolean(anchorEls.login)}
          onClose={handleClose('login')}
          TransitionComponent={Fade}
        >
          <MenuItem data-type="account" onClick={e => handleItem(e, 'login')}>Аккаунт</MenuItem>
          <MenuItem data-type="logout" onClick={auth.signOut}>Выйти</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(Navbar);
// export default Navbar;

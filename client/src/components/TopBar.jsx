import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import img from '../../dist/images/todocal - logo.png';
import CircularProgress from '@mui/material/CircularProgress';
import Sharing from './sharing/ShareDropDown.jsx';
import Viewing from './sharing/SharedWithUserDropdown.jsx';

var pages = [];
const settings = ['Profile','Logout'];

const TopBar = ({isLoading, setIsLoggedIn, isLoggedIn, isMobile, onCalendar, setOnCalendar, userEmail}) => {

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const ShareWithOthers = (<Sharing userEmail={userEmail}/>);
  const ViewShares = (<Viewing userEmail={userEmail}/>);

  if (!isMobile) {
    pages = []
  } else if (isMobile && onCalendar) {
    pages = ['To Do List']
  } else {
    pages = ['Calendar']
  }
  const handleOpenUserMenu = (event) => {
    console.log('trigger open menu:', event.currentTarget)
    setAnchorElUser(event.currentTarget);
  };

  const handlePage = (event) => {
    setOnCalendar(!onCalendar);
  };

  const handleCloseUserMenu = (e) => {
    console.log('trigger close menu:', e.target.innerHTML)
    setAnchorElUser(null);
    if (e.target.innerHTML === 'Logout') {
      axios.get('http://localhost:3000/auth/logout', {withCredentials: true})
      .then((res) => {
        console.log('log out res:', res.data)
        if (res.data === false) {
          setIsLoggedIn(false)
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar style={{ background: 'white', marginBottom:'20px'}} position='static'>
        <Toolbar >
          <Box style={{margin: '0 auto', display: "flex", alignItems: 'right' }}>
            {ShareWithOthers}
          </Box>
          <Box sx={{display: "flex", alignItems: 'left'}}>
            {ViewShares}
          </Box>
          <Box style={{margin: '0 auto', display: "flex"}}></Box>
          <Box>
            {isMobile && <IconButton
              name={pages[0]}
              onClick={(e) => {handlePage(e)}}
              >
                {pages[0] === 'Calendar' ?
                <CalendarMonthIcon style={{fontSize: '50px'}}/> :
                <AssignmentTurnedInIcon style={{fontSize: '50px'}}/>}
              </IconButton>}
          </Box>
          <Box style={{margin: '0 auto', display: "flex"}}>
            <Avatar variant="square" src={img} style={{width:'50px', height:'50px'}}/>
          </Box>
         <Box sx={{ flexGrow: 0 }}>
            {isLoading ? <CircularProgress /> : (isLoggedIn ?
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Yanlin" src="/" />
              </IconButton>
            </Tooltip>
            :
            <Box>
              <Button
              onClick={() => {navigate('/signin')}}
              style={{ background: '#1d71e4',
              color:'white',
              borderRadius:'5px'
              }}>
                Sign in
              </Button >
            </Box>
            )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => {handleCloseUserMenu(e)}}>
                  <Typography textAlign="center" >{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopBar;

import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
import ShareList from './ShareList.jsx';
import ShareWithEmail from './ShareWithEmail.jsx';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import axios from 'axios';

const ShareMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, ' +
      'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


function DisplaySharedWithUserDropdown({userEmail}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [formErr, setFormErr] = useState('');
  const open = Boolean(anchorEl);
  var sharedEmailsArray = ['boc@isalmostdone.com', 'nate@conglomerate.com',
  'excitedtobe@free.com'];
  const [shares, setShares] = React.useState(sharedEmailsArray);
  const [sharesCheck, setSharesCheck] = React.useState(sharedEmailsArray.toString());

  useEffect(async () => {
    await axios.get('http://localhost:3000/share/sharedByUser', {
      params: {email: userEmail},
      withCredentials: true
    }).then((values) => {
      setShares(values.data);
      setSharesCheck((value.data).toString());
    }).catch((err) => {
      console.log(err);
    });
  }, [sharesCheck]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEmailRemove = (e) => async () => {
    const currentIndex = shares.indexOf(e);
    console.log('in handleEmailRemove');
    console.log('expecting email: ', e);

    await axios.delete('http://localhost:3000/share/deleteFromShares', {
      params: {email: e},
      withCredentials: true
    }).then((result) => {
      const newShares = [...shares];
      newShares.splice(currentIndex, 1);

      setShares(newShares);
    }).catch((err) => {
      console.log(err);
    });
  };


  const handleEmailAdd = (e) => {
    const newShares = [...shares];
    newShares.push(e);

    setShares(newShares);
  };


  return (
    <div>
      <Button
        id="shared-with-user-button"
        aria-controls={open ? 'shared-with-user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Share
      </Button>

      <ShareMenu
        id="shared-with-user-menu"
        MenuListProps={{
          'aria-labelledby': 'shared-with-user-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <ShareWithEmail emailArray={shares} email={handleEmailAdd}/>
        <Divider sx={{ my: 0.8 }} />
        <ShareList emailArray={shares} emailRemove={handleEmailRemove}/>
      </ShareMenu>
    </div>
  );
}

export default DisplaySharedWithUserDropdown;
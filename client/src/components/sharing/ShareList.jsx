import React, { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function DisplaySharedWithUserItem(props) {

  return (
    <div>
      <List dense sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
      {props.emailArray.map((val, index) => {
        const labelId = `shared-list-label-${val.shared_to}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              <RemoveCircleIcon
                edge="end"
                onClick={props.emailRemove(val)}

              />
            }
            disablePadding
          >
          <ListItemButton dense>
            <ListItemText id={labelId} primary={`${val.shared_to}`} />
          </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
}

import React, { useState } from 'react';
import { Button } from '@mui/material';


export default function PopoverButton(props) {

    const {popoverJson} = props

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover-button' : undefined;

  return (
    <>
      <Button onClick={(e) => handleClick(e)} aria-describedby={id}>
        {popoverJson?.label}
      </Button>
    </>
  );
};


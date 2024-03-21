import React, { useState } from "react";
import { Button, Tooltip } from "@mui/material";

export default function PopoverButton({ label, tooltipText }) {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      event.stopPropagation();
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'popover-button' : undefined;
  
    return (
      <>
        <Tooltip title={tooltipText}>
          <Button onClick={(e) => handleClick(e)} aria-describedby={id}>
            {label}
          </Button>
        </Tooltip>
      </>
    );
  }

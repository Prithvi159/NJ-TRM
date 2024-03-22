import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function CalendarIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M0,0H24V24H0Z" fill="none"/>
      <path d="M4,5,4,7A2,2,0,0,1,6,5H18a2,2,0,0,1,2,2V19a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2Z" fill="none" stroke="#f6881f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      <path d="M16,3V7" fill="none" stroke="#f6881f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      <path d="M8,3V7" fill="none" stroke="#f6881f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      <path d="M4,11H20" fill="none" stroke="#f6881f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
      <path d="M8,15h2v2H8Z" fill="none" stroke="#f6881f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
    </SvgIcon>
  );
}

export default CalendarIcon;

import React from 'react';
import { Button } from '../ui/button';

function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-5'>
      <img src='/logo.svg' alt='Logo' />
      
    </div>
  );
}

export default Header;

// <Button className='sign-in-button'>Sign In</Button>
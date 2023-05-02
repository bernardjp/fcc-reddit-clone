import React from 'react';
import Navbar from '../Navbar/Navbar';

type LayoutProps = {
  children: React.ReactNode
}

const Layout:React.FC<LayoutProps> = (props) => {
  const { children } = props;
  
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

export default Layout;

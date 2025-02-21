import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  label: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`nav-link text-yellow-300 hover:text-yellow-200 transition-colors ${
        isActive ? 'active' : ''
      }`}
    >
      {label}
    </Link>
  );
};
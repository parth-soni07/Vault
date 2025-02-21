import React from 'react';
import { NavLink } from './NavLink';
import { DiscoverWalletProviders } from '../DiscoverWalletProviders';
export const Navbar: React.FC = () => {
  return (
    <nav className="px-6 py-4 flex items-center justify-between border-b border-[#a3ff47]/20 backdrop-blur-sm">
      <div className="text-[#a3ff47] font-bold text-2xl tracking-wider">
        Sonic Vault 🔐
      </div>
      <div className="flex gap-6">
        <NavLink to="/" label="Home" />
        <NavLink to="/about" label="About" />
        <NavLink to="/contact" label="Contact" />
      </div>
    </nav>
  );
};
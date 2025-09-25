import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase.js';

const Header = ({ onSearch, onDateChange }) => {

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    onDateChange(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <header className="bg-white/70 backdrop-blur-lg sticky top-0 z-40 border-b border-rose-100">
      <div className="container mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-serif font-bold text-slate-800">Our Memories</h1>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <input
            type="search"
            placeholder="Search moments..."
            onChange={(e) => onSearch(e.target.value)}
            className="px-4 py-2 border border-rose-200 bg-white/50 rounded-full focus:ring-2 focus:ring-rose-400 focus:border-rose-400 w-full sm:w-48 transition-all text-sm"
          />
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <input type="date" name="start" onChange={handleDateChange} className="px-3 py-1.5 border border-rose-200 bg-white/50 rounded-full focus:ring-2 focus:ring-rose-400 focus:border-rose-400 w-full"/>
            <span className="text-slate-500">to</span>
            <input type="date" name="end" onChange={handleDateChange} className="px-3 py-1.5 border border-rose-200 bg-white/50 rounded-full focus:ring-2 focus:ring-rose-400 focus:border-rose-400 w-full"/>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="px-4 py-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-full font-semibold transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

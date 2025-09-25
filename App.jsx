import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase.js';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import PhotoGrid from './components/PhotoGrid.jsx';
import FloatingActionButton from './components/FloatingActionButton.jsx';
import UploadModal from './components/UploadModal.jsx';
import Spinner from './components/Spinner.jsx';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleUploadSuccess = () => {
    setIsModalOpen(false);
    setRefreshKey(prevKey => prevKey + 1); // Trigger a refresh of the photo grid
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-rose-50">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-rose-50 text-slate-700">
      <Header 
        user={user} 
        onSearch={setSearchTerm}
        onDateChange={setDateRange}
      />
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        <PhotoGrid 
          searchTerm={searchTerm} 
          dateRange={dateRange}
          key={refreshKey}
        />
      </main>
      <FloatingActionButton onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <UploadModal
          onClose={() => setIsModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default App;

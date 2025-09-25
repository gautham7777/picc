import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { PhotoEntry } from '../types';
import PhotoCard from './PhotoCard';
import Spinner from './Spinner';

interface PhotoGridProps {
  searchTerm: string;
  dateRange: {
    start: string;
    end:string;
  };
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ searchTerm, dateRange }) => {
  const [photos, setPhotos] = useState<PhotoEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const photosCollection = collection(db, 'photos');
        const q = query(photosCollection, orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const photosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as PhotoEntry));
        setPhotos(photosData);
      } catch (err) {
        console.error("Error fetching photos: ", err);
        setError('Failed to load memories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const filteredPhotos = useMemo(() => {
    return photos.filter(photo => {
      const photoDate = photo.date.toDate();
      const searchMatch = photo.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const startDate = dateRange.start ? new Date(dateRange.start) : null;
      const endDate = dateRange.end ? new Date(dateRange.end) : null;
      
      if(startDate) startDate.setHours(0,0,0,0);
      if(endDate) endDate.setHours(23,59,59,999);

      const dateMatch = (!startDate || photoDate >= startDate) && (!endDate || photoDate <= endDate);

      return searchMatch && dateMatch;
    });
  }, [photos, searchTerm, dateRange]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-16">{error}</p>;
  }

  if (filteredPhotos.length === 0) {
    return (
      <div className="text-center py-24">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-rose-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h2 className="mt-4 text-2xl font-serif font-semibold text-slate-600">No Memories Found</h2>
        <p className="text-slate-500 mt-2">Try adjusting your search or add a new memory!</p>
      </div>
    );
  }

  return (
    <div className="masonry-grid">
      {filteredPhotos.map(photo => (
        <div key={photo.id} className="masonry-item">
          <PhotoCard photo={photo} />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;
import React from 'react';
import { PhotoEntry } from '../types';

interface PhotoCardProps {
  photo: PhotoEntry;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const formattedDate = photo.date.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white p-3 rounded-xl shadow-lg shadow-rose-100 hover:shadow-2xl hover:shadow-rose-200 transition-all duration-300 transform hover:-translate-y-1">
      <img
        src={photo.imageUrl}
        alt={photo.description}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <div className="pt-4">
        <p className="text-sm font-semibold text-rose-600 font-sans">{formattedDate}</p>
        {photo.description && (
          <p className="text-slate-600 mt-1 text-base">{photo.description}</p>
        )}
      </div>
    </div>
  );
};

export default PhotoCard;
import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db, storage } from '../services/firebase';
import Spinner from './Spinner';

interface UploadModalProps {
  onClose: () => void;
  onUploadSuccess: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onUploadSuccess }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !date) {
      setError('Please select an image and a date.');
      return;
    }
    setIsUploading(true);
    setError(null);

    try {
      const imageRef = ref(storage, `photos/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const photosCollection = collection(db, 'photos');
      await addDoc(photosCollection, {
        imageUrl,
        description,
        date: Timestamp.fromDate(new Date(date)),
        createdAt: serverTimestamp(),
      });

      onUploadSuccess();
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">Add a New Memory</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Photo</label>
            <div className="mt-1 flex justify-center p-6 border-2 border-rose-200 border-dashed rounded-xl bg-rose-50/50">
              <div className="space-y-1 text-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="mx-auto h-32 w-auto rounded-lg shadow-sm" />
                ) : (
                  <svg className="mx-auto h-12 w-12 text-rose-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <div className="flex text-sm text-slate-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-rose-600 hover:text-rose-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description (optional)</label>
            <textarea
              id="description"
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-rose-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 sm:text-sm"
              placeholder="What was special about this moment?"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="bg-white py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !imageFile}
              className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-rose-300 disabled:cursor-not-allowed transition-colors"
            >
              {isUploading ? <Spinner small={true} /> : 'Add Memory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;
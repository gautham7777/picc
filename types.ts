
import { Timestamp } from 'firebase/firestore';

export interface PhotoEntry {
  id: string;
  imageUrl: string;
  description: string;
  date: Timestamp;
  createdAt: Timestamp;
}

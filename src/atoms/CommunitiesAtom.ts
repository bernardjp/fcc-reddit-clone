import { Timestamp } from 'firebase/firestore';
import { atom } from 'recoil';

export interface Community {
  createdAt?: Timestamp;
  creatorId: string;
  id: string;
  imageURL?: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
}

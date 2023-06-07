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

interface CommunitySnippet {
  communitId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  // visitedCommunities
}

const defaultCommunityState: CommunityState = {
  mySnippets: [],
  // visitedCommunities
};

export const communityState = atom<CommunityState>({
  key: 'communitiesState',
  default: defaultCommunityState,
});

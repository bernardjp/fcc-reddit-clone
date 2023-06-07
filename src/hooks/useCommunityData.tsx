import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  Community,
  CommunitySnippet,
  communityState,
} from '@/atoms/CommunitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/firebase/clientApp';
import {
  collection,
  getDocs,
  writeBatch,
  doc,
  increment,
} from '@firebase/firestore';
import { authModalState } from '@/atoms/authModalAtom';

const useCommunityData = () => {
  const [user] = useAuthState(auth);

  // Global States
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  // Local States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onJoinedOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (!user) {
      setAuthModalState({ open: true, view: 'login' });
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
    } else {
      joinCommunity(communityData);
    }
  };

  const getMySnippets = useCallback(async () => {
    setLoading(true);

    try {
      const snippetsDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetsDocs.docs.map((doc) => ({ ...doc.data() }));

      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log('getMySnippets', error);
      setError(error.message);
    }

    setLoading(false);
  }, [user, setCommunityStateValue]);

  const joinCommunity = async (communityData: Community) => {
    setLoading(true);

    try {
      // Batch writes:
      const batch = writeBatch(firestore);
      // Creating a new community snippet
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || '',
      };

      // Adds the snippet to the users data
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      // Updating the number of members on this community (numberOfMembers + 1)
      batch.update(doc(firestore, 'communities', communityData.id), {
        numberOfMembers: increment(1),
      });
      // Commits the changes to the DB
      await batch.commit();

      // Update recoil state -> communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log('joinCommunity', error);
      setError(error.message);
    }

    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    // Update recoil state -> communityState.mySnippets

    setLoading(true);

    try {
      // Batch writes:
      const batch = writeBatch(firestore);

      // Deleting a new community snippet
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );
      // Updating the number of members on this community (numberOfMembers - 1)
      batch.update(doc(firestore, 'communities', communityId), {
        numberOfMembers: increment(-1),
      });
      // Commits the changes to the DB
      await batch.commit();

      // Update recoil state -> communityState.mySnippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippet) => snippet.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log('leaveCommunity', error);
      setError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user, getMySnippets]);

  return {
    communityStateValue,
    loading,
    onJoinedOrLeaveCommunity,
  };
};

export default useCommunityData;

import React from 'react';
import { Community } from '@/atoms/CommunitiesAtom';
import { firestore } from '@/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import CommunityNotFound from '@/components/Community/NotFound';
import Header from '@/components/Community/Header';

type CommunityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  if (!communityData) return <CommunityNotFound />;

  return (
    <>
      <Header communityData={communityData} />
      <div>WELCOME TO {communityData.id}</div>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Try to get the Community Data from DB
  try {
    const communityDocRef = doc(
      firestore,
      'communities',
      context.query.communityId as string
    );

    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : '',
      },
    };
  } catch (error) {
    // Add error page here
    console.log('getServerSideProps error:', error);
  }
}

export default CommunityPage;

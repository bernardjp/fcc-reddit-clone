import React, { useEffect } from 'react';
import { auth, firestore } from '@/firebase/clientApp';
import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const parsedUser = JSON.parse(JSON.stringify(user));
    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, parsedUser);
  };

  useEffect(() => {
    if (userCred) createUserDocument(userCred.user);
  }, [userCred]);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        onClick={() => signInWithGoogle()}
        isLoading={loading}
      >
        <Image src="/images/googlelogo.png" alt="logo" height="20px" mr={4} />
        Continue with Google
      </Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;

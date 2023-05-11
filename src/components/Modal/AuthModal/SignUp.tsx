import React, { useEffect, useState } from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { auth, firestore } from '@/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/firebase/errors';
import { Button, Flex, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';
import ModalInput from './ModalInput';
import { addDoc, collection } from 'firebase/firestore';

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<String>('');
  const [createUserWithEmailAndPassword, userCred, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) setError('');
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Password do not match');
      return;
    }

    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const createUserDocument = async (user: User) => {
    const parsedUser = JSON.parse(JSON.stringify(user));
    await addDoc(collection(firestore, 'users'), parsedUser);
  };

  useEffect(() => {
    if (userCred) createUserDocument(userCred.user);
  }, [userCred]);

  return (
    <form onSubmit={onSubmit}>
      <ModalInput
        inputName="email"
        placeholder="email"
        type="email"
        onChange={onChange}
      />
      <ModalInput
        inputName="password"
        placeholder="password"
        type="password"
        onChange={onChange}
      />
      <ModalInput
        inputName="confirmPassword"
        placeholder="confirm password"
        type="password"
        onChange={onChange}
      />
      <Text textAlign="center" color="red" fontSize="10pt">
        {error ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'login',
            }))
          }
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;

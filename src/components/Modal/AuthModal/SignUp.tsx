import { authModalState } from '@/atoms/authModalAtom';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Firebase logic
  const onSubmit = () => {};

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="email"
        type="email"
        onChange={onChange}
        bg="gray.50"
        fontSize="10pt"
        mb={2}
        _placeholder={{ color: 'gra.500' }}
        _hover={{
          bg: 'white',
          border: '01px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '01px solid',
          borderColor: 'blue.500',
        }}
      />
      <Input
        required
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
        bg="gray.50"
        fontSize="10pt"
        mb={2}
        _placeholder={{ color: 'gra.500' }}
        _hover={{
          bg: 'white',
          border: '01px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '01px solid',
          borderColor: 'blue.500',
        }}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        onChange={onChange}
        bg="gray.50"
        fontSize="10pt"
        mb={2}
        _placeholder={{ color: 'gra.500' }}
        _hover={{
          bg: 'white',
          border: '01px solid',
          borderColor: 'blue.500',
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '01px solid',
          borderColor: 'blue.500',
        }}
      />
      <Button width="100%" height="36px" mb={2} mt={2} type="submit">
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

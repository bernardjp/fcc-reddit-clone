import React, { useState } from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '@/atoms/authModalAtom';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Firebase logic
  const onSubmit = () => {};

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
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
      <Button width="100%" height="36px" mb={2} mt={2} type="submit">
        Log In
      </Button>
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: 'signup',
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;

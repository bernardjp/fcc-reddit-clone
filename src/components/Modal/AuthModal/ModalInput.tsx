import React from 'react';
import { Input } from '@chakra-ui/react';

type ModalInputProps = {
  type: 'email' | 'password';
  inputName: 'email' | 'password' | 'confirmPassword';
  placeholder: 'email' | 'password' | 'confirm password';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalInput: React.FC<ModalInputProps> = (props: ModalInputProps) => {
  const { type, inputName, placeholder, onChange } = props;

  return (
    <Input
      required
      name={inputName}
      placeholder={placeholder}
      type={type}
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
  );
};

export default ModalInput;

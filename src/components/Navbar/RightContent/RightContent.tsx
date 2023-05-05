import React from 'react';
import { Flex } from '@chakra-ui/react';
import AuthButtons from './AuthButtons';
import AuthModal from '@/components/Modal/AuthModal/AuthModal';

type RightContentProps = {
  // user
};

const RightContent:React.FC<RightContentProps> = () => {
  
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        <AuthButtons />
      </Flex>
    </>
  )
}
export default RightContent;
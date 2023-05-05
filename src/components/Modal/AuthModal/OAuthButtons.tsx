import React from 'react';
import { Flex, Image, Button } from '@chakra-ui/react';

const OAuthButtons: React.FC = () => {
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2}>
        <Image src="/images/googlelogo.png" alt="logo" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth" mb={2}>
        Other Providers
      </Button>
    </Flex>
  );
};

export default OAuthButtons;
import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type PageContentProps = {
  children?: ReactNode[];
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  return (
    <Flex border="1px solid red" justify="center" p="16px 0px">
      <Flex
        border="1px solid blue"
        justify="center"
        width="95%"
        maxWidth="860px"
      >
        {/* LHS */}
        <Flex
          border="1px solid green"
          direction="column"
          width={{ base: '100%', md: '65%' }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0]}
        </Flex>

        {/* RHS */}
        <Flex
          border="1px solid orange"
          display={{ base: 'none', md: 'flex' }}
          direction="column"
          flexGrow={1}
        >
          {children && children[1]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;

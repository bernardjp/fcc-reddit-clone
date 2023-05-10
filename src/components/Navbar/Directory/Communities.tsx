import React, { useState } from 'react';
import CreateCommunityModal from '@/components/Modal/CreateCommunity/CreateCommunityModal';
import { Flex, Icon, MenuItem } from '@chakra-ui/react';
import { GrAdd } from 'react-icons/gr';

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: 'gray.200' }}
        onClick={() => setOpen(true)}
      >
        <Flex align="center">
          <Icon as={GrAdd} fontSize={20} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;

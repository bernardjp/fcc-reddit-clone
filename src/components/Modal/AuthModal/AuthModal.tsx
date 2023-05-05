import React from 'react';
import { authModalState } from '@/atoms/authModalAtom';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

const AuthModal:React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleCloseModal = () => {
    setModalState(prev => ({
      ...prev, open: false
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalState.view}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AuthModal;

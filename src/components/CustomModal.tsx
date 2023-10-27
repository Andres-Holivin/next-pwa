"use client"
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
interface ICustomModal {
    children?: React.ReactNode
    btnName?: string | null
    save: (arg0: () => void) => void
    title: string
}
export default function CustomModal(props: ICustomModal) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>{props.btnName == null ? "Open Modal" : props.btnName}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{props.title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {props.children}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" onClick={() => props.save(onClose)}>Save</Button>
                        <Button colorScheme='red' ml={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
import { Button } from "@chakra-ui/button";
import { Badge } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { ReactElement } from "react";
import { Language } from "./../utils";

interface Props {
  languages: Language[];
  selectedLanguages: string[];
  isOpen: boolean;
  onClose: () => void;
  toggleSelect: (language: string) => void;
}

export default function Languages({
  isOpen,
  onClose,
  languages,
  toggleSelect,
  selectedLanguages,
}: Props): ReactElement {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx="15" my="10">
        <ModalHeader>Select Languages</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {languages.map((language) => (
            <Badge
              m="1"
              p="2"
              background={
                selectedLanguages.includes(language.name)
                  ? "pink.600"
                  : "whiteAlpha.100"
              }
              borderRadius="3xl"
              onClick={() => toggleSelect(language.name)}
            >
              {language.name}
            </Badge>
          ))}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

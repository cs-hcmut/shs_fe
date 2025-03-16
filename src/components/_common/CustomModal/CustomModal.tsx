import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, Modal } from "@mui/material";
import { ReactNode } from "react";

interface CustomModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: ReactNode;
  onClose?: () => void;
}

export default function CustomModal({
  isOpen,
  setIsOpen,
  children,
  onClose,
}: CustomModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={() => {
        if (onClose) {
          onClose();
        }
        setIsOpen(false);
      }}
      className="relative"
    >
      <div className="bg-white max-w-[80vw] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-4 px-6 rounded-xl">
        <div className="mr-[20px] overflow-hidden">{children}</div>
        <IconButton
          onClick={() => {
            setIsOpen(false);
          }}
          className="!absolute !right-1 !top-1"
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconButton>
      </div>
    </Modal>
  );
}

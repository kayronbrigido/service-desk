import { MainTheme } from "@src/config/theme";
import Modal from "antd/es/modal/Modal";
import { useTranslations } from "next-intl";
import { ReactNode, useState } from "react";

interface ISearchModal {
  children?: ReactNode
  isVisible?: boolean
  onClose?: () => void;
  onCancel?: () => void;
  onOk?: () => void;
}

const BaseModal = ({ children, isVisible, onClose, onCancel, onOk }: ISearchModal) => {
  return (
    <Modal
      visible={isVisible}
      onClose={onClose}
      onCancel={onCancel}
      onOk={onOk}
      footer={null}
      styles={{
        content: {
          background: MainTheme.primaryBackgroundColor,
          borderColor: MainTheme.borderPrimaryColorBorder,
          borderStyle: 'solid',
          borderWidth: '2px',
          color: MainTheme.textPrimaryColor,
          width: 'fit-content',
        },
      }}
    >
      {children}
    </Modal>
  )
};

export default BaseModal;
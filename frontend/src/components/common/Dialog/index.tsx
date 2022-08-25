import React, { Component, useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./style.css";

type IProps = {
  isOpen: boolean;
  title: string;
  body?: any;
  footer?: any;
  className?: string;
  closeDialog?: () => void;
  closeButtonTitle?: string;
};

export default function Dialog(props: IProps) {
  const [id, setId] = useState('');

  const toggle = () => {
    props.closeDialog && props.closeDialog();
  }

  useEffect(() => {
    setId(`dialog-id-${Math.random()}`);
  }, [])

  let { closeButtonTitle, footer, body, closeDialog, className, isOpen, title } = props;
  let footerRender = footer;
  if (closeDialog) {
    footerRender = (
      <Button onClick={toggle} onTouchEnd={(e) => {
        e.stopPropagation();
        toggle();
      }}>
        {`${closeButtonTitle ? closeButtonTitle : "Close"}`}
      </Button>
    );
  }
  return (
    <React.Fragment>
      <div>
        <Modal id={id} className={className} isOpen={isOpen} toggle={toggle} centered={true}>
          <ModalHeader>{title}</ModalHeader>
          {body ? <ModalBody>{body}</ModalBody> : null}
          {footerRender && <ModalFooter>{footerRender}</ModalFooter>}
        </Modal>
      </div>
    </React.Fragment>
  );
}

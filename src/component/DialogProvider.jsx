import Dialog from "@/component/Dialog";
import { useState, useCallback, useRef } from "react";

/**
 * 全局弹窗API
 */
let showDialog;
export function alertDialog(msg, delay = 1) {
  if (showDialog) showDialog(msg, delay);
}

const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(1);
  const timerRef = useRef();

  const handleShow = useCallback((msg, d) => {
    setMessage(msg);
    setDelay(d || 1);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setMessage("");
  }, []);

  showDialog = handleShow;

  return (
    <>
      {children}
      <Dialog open={open} message={message} delay={delay} onClose={handleClose} />
    </>
  );
};

export default DialogProvider;

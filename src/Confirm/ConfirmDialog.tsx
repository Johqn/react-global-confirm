import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './ConfirmDialog.css';

const DEFAULT_TITLE = 'Confirmation';
const DEFAULT_MESSAGE = <p>Do you confirm ?</p>;

type Props = {
  isOpen?: boolean;
  title?: string;
  message?: JSX.Element;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  title = DEFAULT_TITLE,
  message = DEFAULT_MESSAGE,
  isOpen = false,
  onConfirm,
  onCancel,
}: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog ref={dialogRef} className="modal-dialog">
      <form onSubmit={onConfirm} method="dialog">
        <h2>{title}</h2>
        <div>{message}</div>
        <button type="submit">Confirm</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </dialog>,
    document.body
  );
};

export default ConfirmDialog;

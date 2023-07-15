import { createPortal } from 'react-dom';
import classNames from '../utils/classNames';
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
}: Props) =>
  createPortal(
    <div
      className={classNames([
        'modal-container',
        {
          'modal-container-visible': isOpen,
        },
      ])}
    >
      <dialog open className="modal-dialog">
        <form onSubmit={onConfirm} method="dialog">
          <h2>{title}</h2>
          {message}
          <button type="submit">Confirm</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </dialog>
    </div>,
    document.body
  );

export default ConfirmDialog;

import {
  ComponentProps,
  createContext,
  createRef,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import ConfirmDialog from '../Confirm/ConfirmDialog';

type ConfirmOptions = Omit<
  ComponentProps<typeof ConfirmDialog>,
  'isOpen' | 'onConfirm' | 'onCancel'
>;

const defauftConfirm = (_: ConfirmOptions) => Promise.resolve(true);

const defaultContext = {
  confirmRef: {
    current: defauftConfirm,
  },
};

const ConfirmContext = createContext(defaultContext);

const ConfirmWrapper = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(true);

  const confirmRef = createRef<typeof defauftConfirm>();

  const close = (confirmed: boolean) => {
    setIsOpen(false);
  };
  const confirm = () => {
    console.log('confirm');
    close(true);
  };
  const cancel = () => {
    console.log('cancel');
    close(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      {children}
      <ConfirmDialog onConfirm={confirm} onCancel={cancel} isOpen={isOpen} />
    </ConfirmContext.Provider>
  );
};

export default ConfirmWrapper;

export const useConfirmDialog = () => {
  useContext(ConfirmContext);
};

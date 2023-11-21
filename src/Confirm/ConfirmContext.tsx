import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useRef,
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

export const ConfirmContextProvider = ({ children }) => {
  const { confirmRef } = useContext(ConfirmContext);

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  const resolveRef = useRef((_: boolean) => {});

  confirmRef.current = (options) =>
    new Promise((resolve) => {
      setIsOpen(true);
      setOptions(options);
      resolveRef.current = resolve;
    });

  const confirm = () => {
    console.log('confirm');
    setIsOpen(false);
    resolveRef.current(true);
  };

  const cancel = () => {
    console.log('cancel');
    setIsOpen(false);
    resolveRef.current(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirmRef }}>
      {children}
      <ConfirmDialog
        {...options}
        onConfirm={confirm}
        onCancel={cancel}
        isOpen={isOpen}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const { confirmRef } = useContext(ConfirmContext);
  return {
    confirm: useCallback(
      (options: ConfirmOptions) => {
        return confirmRef.current(options);
      },
      [confirmRef]
    ),
  };
};

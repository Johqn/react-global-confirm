import {
  ComponentProps,
  PropsWithChildren,
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

const confirmAction = {
  current: defauftConfirm,
};

export const confirm = (options: ConfirmOptions) => {
  return confirmAction.current(options);
};

const ConfirmWrapper = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  const resolveRef = useRef((_: boolean) => {});

  confirmAction.current = (options) =>
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
    <>
      {children}
      <ConfirmDialog
        {...options}
        onConfirm={confirm}
        onCancel={cancel}
        isOpen={isOpen}
      />
    </>
  );
};

export default ConfirmWrapper;

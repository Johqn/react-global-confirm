import { FormEvent, useState } from 'react';
import { useConfirm } from './Confirm/ConfirmContext';

const Form = () => {
  const [text, setText] = useState('');
  const handleTextInput = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setText(currentTarget.value);

  const { confirm } = useConfirm();

  const doAction = () => {
    console.log('Action');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      await confirm({
        title: 'Custom confirm title',
      })
    ) {
      doAction();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onInput={handleTextInput} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

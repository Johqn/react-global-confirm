import { FormEvent, useState } from 'react';
import { confirm } from './Confirm/ConfirmWrapper';

const Form = () => {
  const [text, setText] = useState('');
  const handleTextInput = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setText(currentTarget.value);

  const doAction = () => {
    console.log('Action');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      await confirm({
        title: 'Mon titre',
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

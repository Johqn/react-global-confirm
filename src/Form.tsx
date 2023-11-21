import { FormEvent, useState } from 'react';
import { useConfirm } from './Confirm/ConfirmContext';

const Form = ({ name = 'Form' }) => {
  const [text, setText] = useState('');
  const handleTextInput = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setText(currentTarget.value);

  const [submittedText, setSubmittedText] = useState('');
  const doAction = () => {
    console.log('Action');
    setSubmittedText(text);
  };

  const { confirm } = useConfirm();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (
      await confirm({
        title: `${name} confirmation`,
      })
    ) {
      doAction();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>{name}</h3>
        <input type="text" value={text} onInput={handleTextInput} />
        <button type="submit">Submit</button>
      </form>
      {submittedText ? <p>{submittedText}</p> : null}
    </>
  );
};

export default Form;

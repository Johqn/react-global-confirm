import { FormEvent, useState } from 'react';

const Form = () => {
  const [text, setText] = useState('');
  const handleTextInput = ({ currentTarget }: FormEvent<HTMLInputElement>) =>
    setText(currentTarget.value);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onInput={handleTextInput} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

import './App.css';
import { ConfirmContextProvider } from './Confirm/ConfirmContext';
import Form from './Form';

const App = () => (
  <div>
    <ConfirmContextProvider>
      <Form />
      <Form name="Form 2" />
    </ConfirmContextProvider>
  </div>
);

export default App;

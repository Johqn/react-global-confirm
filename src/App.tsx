import './App.css';
import { ConfirmContextProvider } from './Confirm/ConfirmContext';
import Form from './Form';

const App = () => (
  <div>
    <ConfirmContextProvider>
      <Form />
    </ConfirmContextProvider>
  </div>
);

export default App;

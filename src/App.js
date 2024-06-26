import Form from "./components/form";
import "./App.css";
import { FormContextProvider } from "./context";

export default function App() {
  return (
    <FormContextProvider>
      <Form />
    </FormContextProvider>
  );
}

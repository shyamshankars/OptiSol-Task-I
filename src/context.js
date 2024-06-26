import { useState } from "react";
import { createContext } from "react";

export const FormContext = createContext();

export const FormContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone1: "",
    phone2: "",
    phone3: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    qualification: "",
    comments: "",
  });
  const [displayItems, setDisplayItems] = useState([]);
  const [isViewing, setIsViewing] = useState({ id: "", viewState: false });

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        displayItems,
        setDisplayItems,
        isViewing,
        setIsViewing,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

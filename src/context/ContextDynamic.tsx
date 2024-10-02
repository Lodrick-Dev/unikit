import { createContext, useContext, useState } from "react";
import {
  TypeContextDynamic,
  TypeContextDynamicProviderProps,
} from "./TypeContext";

const ContextDynamic = createContext<TypeContextDynamic | undefined>(undefined);

export const ContextDynmacProvider = ({
  children,
}: TypeContextDynamicProviderProps) => {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [selectMatiere, setSelectMatiere] = useState<string | Blob>("");
  const [nameDoc, setNameDoc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [consigne, setConsigne] = useState("Vérifier le fichier");
  return (
    <ContextDynamic.Provider
      value={{
        fileUpload,
        setFileUpload,
        selectMatiere,
        setSelectMatiere,
        nameDoc,
        setNameDoc,
        loading,
        setLoading,
        consigne,
        setConsigne,
      }}
    >
      {children}
    </ContextDynamic.Provider>
  );
};

export const Dynamic = () => {
  const context = useContext(ContextDynamic);
  if (!context) {
    throw new Error(
      "useContextDynamic must be used within a ContextDynamicProvider"
    );
  }
  return context;
};

import { ReactNode } from "react"

export type TypeContextDynamic = {
    fileUpload: File | null,
    setFileUpload: React.Dispatch<React.SetStateAction<File | null>>;
    selectMatiere: string | Blob,
    setSelectMatiere: React.Dispatch<React.SetStateAction<string | Blob>>
    nameDoc: string,
    setNameDoc:React.Dispatch<React.SetStateAction<string>>
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    consigne: string, setConsigne: React.Dispatch<React.SetStateAction<string>>
}

export type TypeContextDynamicProviderProps = {
    children: ReactNode;
}
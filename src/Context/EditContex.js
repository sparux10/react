import { createContext, useState } from "react"

export const Edit = createContext()
export default function EditContext({children}){
    const [close,setClose] = useState(false)
    return <Edit.Provider value={{close,setClose}}>{children}</Edit.Provider>
}
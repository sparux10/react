import { createContext, useState } from "react"

export const Menu = createContext()
export default function MenuContext({children}){
    const [isOpen, setisOpen] = useState(false)
    return <Menu.Provider value={{isOpen,setisOpen}}>{children}</Menu.Provider>
}
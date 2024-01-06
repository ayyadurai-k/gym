import React, { createContext, useState } from 'react'

export const Context = createContext(null);

export const ContextProvider = (props) => {

    const [createsales, setCreatesales] = useState(false)
    const [createpurchase, setCreatepurchase] = useState(false)
    const [newMember, setNewMember] = useState(false)
    const [newExpence, setNewExpence] = useState(false)

    const createS = () => {
        setCreatesales(true)
    }
    const createP = () => {
        setCreatepurchase(true)
    }
    const back = () => {
        setCreatesales(false)
        setCreatepurchase(false)
        setNewMember(false)
        setNewExpence(false)
    }
    const newmember = () => {
        setNewMember(true)
    }
    const newexpence = () => {
        setNewExpence(true)
    }
    

    const contextValue = { newexpence, newExpence ,createS, createP, createpurchase, createsales, back,newMember ,newmember }
    return (
        <Context.Provider value={contextValue}>{props.children}</Context.Provider>
    )
}
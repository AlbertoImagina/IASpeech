import React, { Dispatch, SetStateAction, useContext } from "react";

interface DataContext {
    step: number;
    setStep: Dispatch<SetStateAction<number>>;
}

export const DataContext = React.createContext<DataContext>({
    step: 0,
    setStep: () => { },
})

export const useDataContext = () => {
    return useContext(DataContext);
}
import React, { Dispatch, SetStateAction, useContext } from "react";

interface DataContext {
    step: number;
    isLoading: boolean;
    setStep: Dispatch<SetStateAction<number>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const DataContext = React.createContext<DataContext>({
    step: 0,
    isLoading: false,
    setStep: () => { },
    setIsLoading: () => { },
})

export const useDataContext = () => {
    return useContext(DataContext);
}
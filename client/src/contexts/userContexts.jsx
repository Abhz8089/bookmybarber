import { createContext,useContext,useState } from "react";

const UserDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);

export const UseDataProvider = ({children}) => {
    const [userData, setUserData] = useState({
        userName  : '',
        email: '',
        password:'',
        cPassword : ''

    });

    return (
      <UserDataContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserDataContext.Provider>
    );
}
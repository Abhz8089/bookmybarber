import { createContext,useContext,useState } from "react";

const UserDataContext = createContext();
const AdminDataContext = createContext();

export const useUserData = () => useContext(UserDataContext);
export const useAdminData = () => useContext(AdminDataContext);

export const UseDataProvider = ({children}) => {
    const [userData, setUserData] = useState({
        userName  : '',
        email: '',
        password:'',
        cPassword : ''

    });

      const [adminData, setAdminData] = useState({
        adminName: "",
        adminEmail: "",
        adminPassword: "",
      });


    return (
      <UserDataContext.Provider value={{ userData, setUserData }}>
      <AdminDataContext.Provider value={{ adminData, setAdminData }}>

        {children}
      </AdminDataContext.Provider>
      </UserDataContext.Provider>
    );
}
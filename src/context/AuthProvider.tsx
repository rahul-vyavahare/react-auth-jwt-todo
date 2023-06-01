import { createContext,useContext,useMemo,useState} from 'react';

const AuthContext=createContext<any>(null);
type appProp={
    children?:React.ReactNode;
}

const AuthProvider=({children}:appProp)=>{
    const [token,setToken] = useState<string|null>(null);
const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
    return(
<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
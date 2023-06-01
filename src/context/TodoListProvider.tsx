import { createContext,useContext,useMemo,useState} from 'react';

const TodoListContext=createContext<any>(null);
type appProp={
    children?:React.ReactNode;
}
interface todoInterface{
Id:Number,
task:string
subTask:{task:string}
}
const TodoListProvider=({children}:appProp)=>{
    const [todos,setTodos] = useState<todoInterface|null>(null);
const contextValue = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos]
  );
    return(
<TodoListContext.Provider value={contextValue}>{children}</TodoListContext.Provider>
    );
}

export const useTodoList = () => {
  return useContext(TodoListContext);
};

export default TodoListProvider;
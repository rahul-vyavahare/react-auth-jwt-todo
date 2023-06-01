import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { getUserFromToken } from "../services/AuthService";
import { useTodoList } from "../context/TodoListProvider";
import { SyntheticEvent,  useState } from "react";
import $ from 'jquery';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface todoInterface {
  id: number;
  task: string;
  subTask: sub[];
}
interface sub{
  name:string,
  id:number
}
const Throttle = (fn: any, delay: number) => {
  let called = false;
  return function (...args: any[]) {
    if (!called) {
      called = true;
      fn(...args);
      setTimeout(() => {
        called = false;
      }, delay);
    }
  };
};
export default function Dashboard() {
  const { token, setToken } = useAuth();
  const { todos, setTodos } = useTodoList();
  const [task, setTask] = useState("");
  const [subTask, setSubTask] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [todoid, setTodoid] = useState<number>(0);

  const handleCollapse = (e: SyntheticEvent) => {
    e.preventDefault();
    const { id } = e.target as any;
    if ($("#sub" + id).hasClass('sub-tasks-hide')) {
      $("#sub" + id).removeClass('sub-tasks-hide');
      $("#sub" + id).addClass('sub-tasks-show');
      $("#arrow" + id).removeClass('fa-caret-right');
      $("#arrow" + id).addClass('fa-caret-down');
    } else {
      $("#sub" + id).addClass('sub-tasks-hide');
      $("#sub" + id).removeClass('sub-tasks-show');
      $("#arrow" + id).addClass('fa-caret-right');
      $("#arrow" + id).removeClass('fa-caret-down');
    }
  };

  const handleSubTask = (e: SyntheticEvent, id: number) => {
    e.preventDefault();
    setShowModal(true);
    setTodoid(id);
  };

  const handleClose = () => {
    setShowModal(false);
    setTodoid(0);
    setSubTask('');
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/", { replace: true });
  };

  const handleTodo = () => {
    if (task) {
      let todo = { task, subTask, id: todos?.length + 1 || 1 };
      todos ? setTodos([...todos, todo]) : setTodos([todo]);
      setTask("");
      setSubTask("");
    }
  };

  const userName = token ? getUserFromToken(token) : null;

  if (!userName) {
    return <Navigate to={'/login'} />; // Redirect to login page
  }

  const handleSubTaskAdd = (e:SyntheticEvent) => {
    e.preventDefault();
    if (subTask) {
      let all = [...todos];
      let allSub = all[todoid-1]?.subTask ?[...all[todoid-1]['subTask']]:[];
      allSub = allSub.length? [...allSub, { id: allSub?.length || 1, name: subTask }]:[{ id: 1, name: subTask }];
      all[todoid-1].subTask = allSub;
      setTodos([...all]);
      handleClose();
    }
  };

  return (
    <>
      <main className="dashboard-bg" style={{ padding: "0 2rem", height: "100vh" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Dashboard</h1>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <p>Welcome, {userName}!</p>
            <button onClick={handleLogout} style={{ height: "2rem" }}>
              <span className="circle1"></span>
              <span className="circle2"></span>
              <span className="circle3"></span>
              <span className="circle4"></span>
              <span className="circle5"></span>
              <span className="text">Logout</span>
            </button>
          </div>
        </div>
        <div style={{ width: "90%", display: "flex", height: "60%" }}>
          <div style={{ width: "70%", display: "grid" }}>
            <h4 style={{ paddingLeft: '9rem' }}>My Todos</h4>
            <div id="todo-list" style={{ paddingLeft: '1rem', width: "70%", display: "grid", height: "25rem", overflow: 'auto' }}>
              <ul onClick={handleCollapse} id='todo-list-outer'>
                {todos && [...todos].map((el: todoInterface, idx: React.Key) => (
                  <Todo key={idx} todo={el} handler={handleSubTask} />
                ))}
              </ul>
            </div>
          </div>
          <div style={{ width: "30%", minHeight: "25rem", placeItems: "center", display: "flex" }}>
            <div style={{ width: "80%", display: "grid", gap: "2rem", placeItems: "center" }}>
              <input
                key={"task"}
                type="text"
                style={{ height: "2rem", width: "15rem" }}
                value={task}
                onChange={(e) => setTask(e.target.value.slice(0, 100))}
                placeholder="task"
              />
              
              <button onClick={Throttle(handleTodo, 500)} style={{ height: "2rem", width: "5rem" }}>
                <span className="circle1"></span>
                <span className="circle2"></span>
                <span className="circle3"></span>
                <span className="circle4"></span>
                <span className="circle5"></span>
                <span className="text">Add</span>
              </button>
            </div>
          </div>
        </div>
      </main>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          
          <input
            style={{ height: "2rem", width: "15rem" }}
            type="text"
            value={subTask}
            onChange={(e) => setSubTask(e.target.value.slice(0, 100))}
            placeholder="subtask"
          />
          <button onClick={handleSubTaskAdd} style={{ height: "2rem", width: "5rem" }}>
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <span className="text">Add</span>
          </button>
        </Box>
      </Modal>
    </>
  );
}

interface TodoProps {
  todo: todoInterface;
  handler: (e: SyntheticEvent, id: number) => void;
}

function Todo({ todo, handler }: TodoProps) {
  return (
    <>
      <li
        style={{
          width: "20rem",
          minHeight: "2rem",
          display: "grid",
          
        }}
        className="ellpsis todo todo-item"
        id={"" + todo.id}
      ><span style={{
        
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{cursor:'pointer'}}>
          {todo?.subTask ? (
            <i
              id={"arrow" + todo.id}
              className="fa fa-caret-right"
              aria-hidden="true"
              style={{ fontSize: "0.7rem", marginRight: "0.5rem",cursor:'pointer' }}
            />
          ) : null}
          {todo.task}
        </span>
        <i
          id={"add" + todo.id}
          className="fa fa-plus"
          aria-hidden="true"
          style={{ fontSize: "0.7rem", marginRight: "0.5rem" }}
          onClick={(e) => handler(e, todo.id)}
        /></span>
        <span>
        {todo?.subTask?.length > 0 ? (
          <ul className="sub-tasks sub-tasks-hide" id={"sub" + todo.id}>
            {todo.subTask.map((el) => (
              <li className="ellpsis" key={el.id}>
                {" "}
                {el.name}{" "}
              </li>
            ))}
          </ul>
        ) : null}</span>
      </li>
    </>
  );
}

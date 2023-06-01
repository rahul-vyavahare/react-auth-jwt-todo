export const users:todosInterface[] = [
    {
      id: 1,
      username: 'admin',
      password: 'admin',
      name: 'Admin',
      todos:[]
    },
    {
      id: 2,
      username: 'Tester',
      password: 'tester',
      name: 'Tester',
      todos:[]
    },
  ];
  interface todosInterface{
    id:Number,
    username:string,
    password:string,
    name:string
    todos:any[]
    }
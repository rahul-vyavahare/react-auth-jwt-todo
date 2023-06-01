// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import { ProtectedRoute } from "./ProtectedRoute";
// import Login from "./Login";
// import Dashboard from "./Dashboard";
// import Home from "./Home";
// const Routes=()=>{
//     const { token } = useAuth();

// const routesForPublic = [
//     {
//       path: "/service",
//       element: <div>Service Page</div>,
//     },
//     {
//       path: "/about-us",
//       element: <div>About Us</div>,
//     },
//   ];

//   const routesForAuthenticatedOnly = [
//     {
//       path: "/",
//       element: <ProtectedRoute />, 
//       children: [
//         {
//           path: "/",
//           element: <div>User Home Page</div>,
//         },
//         {
//           path: "/profile",
//           element: <Dashboard/>,
//         },
//         // {
//         //   path: "/logout",
//         //   element: <div>Logout</div>,
//         // },
//       ],
//     },
//   ];

//   const routesForNotAuthenticatedOnly = [
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/login",
//       element: <Login/>,
//     },
//   ];

//   const router = createBrowserRouter([
//     ...routesForPublic,
//     ...(!token ? routesForNotAuthenticatedOnly : []),
//     ...routesForAuthenticatedOnly,
//   ]);

//   return <RouterProvider router={router} />;
// };

// export default Routes;
export {}
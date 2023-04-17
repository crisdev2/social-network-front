import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import App from './App'
import Error404 from './components/pages/Error404'
import Posts from './components/pages/Posts'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App><Dashboard /></App>,
  },
  {
    path: "/posts",
    element: <App><Posts /></App>,
  },
  {
    path: "/login",
    element: <App><Login /></App>,
  },
  {
    path: "/signup",
    element: <App><SignUp /></App>,
  },
  {
    path: "/*",
    element: <App><Error404 /></App>,
  },
])

const Router = () => {
  return <RouterProvider router={routes} />
}

export default Router
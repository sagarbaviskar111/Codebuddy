import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import MultiStepForm from "./pages/multi-step-form"
import Posts from './pages/posts'

const router = createBrowserRouter([
  {path: '/', element: <MultiStepForm />},
  {path: '/posts', element: <Posts/>}

])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
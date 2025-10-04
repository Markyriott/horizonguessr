import { Navigate, useRoutes } from 'react-router';
import UnlimitedMachineGuessr from './components/games/MachineGuessr'


function App() {
  
  let element = useRoutes([
    {path: '/', element: <Navigate to='/machineguessr' replace /> }, 
    {path: '/machineguessr',  element: <UnlimitedMachineGuessr />}
  ]); 
  
  
  return (
    <>
      {element}
    </>
  )
}

export default App

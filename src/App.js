import {React} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Localtodo from './containers/Localtodo'
import './styles/todo.scss';
function App() {

  return (
 

<>


    <BrowserRouter>
      <Routes>  
      <Route path='/' element={<Localtodo />} />
      <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>


    
    </>

  );
}

export default App;

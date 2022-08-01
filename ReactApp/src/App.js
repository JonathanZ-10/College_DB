import {Home} from './Home';
import {Student} from './Student';
import {Professor} from './Professor';
import {Course} from './Course';
import {Navigation} from './Navigation';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          College Database
        </h3>

        <Navigation/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/students' element={<Student/>}/>
          <Route path='/professors' element={<Professor/>}/>
          <Route path='/courses' element={<Course/>}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;

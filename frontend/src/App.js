import './App.css';
import StudentAcount from './components/StudentAcount.js';
import StudentLogin from './components/StudentLogin.js';
import StudentRegister from './components/StudentrRegister.js';

function App() {
  return (
    <div className="App">
      
      {/* <StudentRegister/>  */}
      <StudentLogin/>
      <StudentAcount/>
      
    </div>
  );
}

export default App;

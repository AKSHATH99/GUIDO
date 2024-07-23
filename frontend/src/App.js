import './App.css';
import StudentAcount from './components/Student/StudentAcount.js';
import StudentLogin from './components/Student/StudentLogin.js';
import StudentRegister from './components/Student/StudentrRegister.js';
import MentorRegistration from './components/Mentor/MentorRegistration.js';
import MentorLogin from './components/Mentor/MentorLogin.js';
import MentorAccount from './components/Mentor/MentorAccount.js';

function App() {
  return (
    <div className="App">
      
      {/* <StudentRegister/>  */}
      {/* <StudentLogin/>
      <StudentAcount/> */}
      {/* <MentorRegistration/> */}
      {/* <MentorLogin/> */}
      <MentorAccount/>  
      
    </div>
  );
}

export default App;

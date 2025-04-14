import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import CourseList from './Pages/Courses/CourseList'
import ContactUs from './Pages/ContactUs'
import DeniedPage from './Pages/Denied'
import CourseDescription from './Pages/Courses/courseDescription'

function App() {

  return (
    <>
    <Routes>
      <Route path= "/" element = { <HomePage/> } ></Route>
      <Route path= "/about" element = { <AboutUs/> } ></Route>
      <Route path= "/signup" element = { <SignUp/> } ></Route>
      <Route path= "/login" element = { <Login/> } ></Route>
      
      <Route path= "/courses/description" element = { <CourseDescription/> } ></Route>
      <Route path= "/courses" element = { <CourseList/> } ></Route>
      <Route path= "/contact" element = { <ContactUs/> } ></Route>
      <Route path= "/denied" element = { <DeniedPage/> } ></Route>

      <Route path= "*" element = { <NotFound/> } ></Route>

    </Routes>
    </>
  )
}

export default App
  
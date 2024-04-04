import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Header from './Components/Header'
import FooterCom from './Components/Footer'
import PrivateRoute from './Components/PrivateRoute'
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './Components/ScrollToTop';
import Search from './pages/Search';


function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/sign-in' element={<SignIn/>} />
      <Route path='/search' element={<Search />} />
      {/* to make dashboard private we used private route which only allows u to enter into a page if authenticated*/}
      <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
      <Route path='/projects' element={<Projects/>} />
      <Route path='/post/:postSlug' element={<PostPage />} />
    </Routes>
    <FooterCom/>
    </BrowserRouter>
  )
}

export default App
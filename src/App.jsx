import React from 'react'
import Signin from './Pages/Signin'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Dashboard from './Pages/Dashboard'
import PageNotFound from './Pages/PageNotFound'
import Protected from './Components/Protected'
import ForgotPass from './Pages/ForgotPass'
import ResetPass from './Pages/ResetPass'
import PublicOnly from './Components/PublicOnly'
import ResetGuard from './Components/ResetGuard'
import Overview from './Pages/Crm/Overview'
import Contacts from './Pages/Crm/Contacts'
import Deals from './Pages/Crm/Deals'
import Tasks from './Pages/Crm/Tasks'
import Activities from './Pages/Crm/Activities'
import Profile from './Pages/Crm/Profile'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicOnly> <Home /> </PublicOnly> }></Route>
        <Route path='/signin' element={<PublicOnly> <Signin /> </PublicOnly> }></Route>
        <Route path='/signup' element={<PublicOnly> <Signup /> </PublicOnly> }></Route>
        <Route path='/dashboard' element={<Protected><Dashboard /></Protected>}>
          <Route index element={<Overview />} />
          <Route path='leads' element={<Contacts key='leads' mod='leads' title='Leads' statuses={['New','Contacted','Qualified','Converted','Lost']} />} />
          <Route path='customers' element={<Contacts key='customers' mod='customers' title='Customers' statuses={['Active','Inactive']} />} />
          <Route path='deals' element={<Deals />} />
          <Route path='tasks' element={<Tasks />} />
          <Route path='activities' element={<Activities />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/forgotpass' element={<PublicOnly> <ForgotPass/></PublicOnly> }></Route>
        <Route path='/resetpass' element={<PublicOnly><ResetGuard><ResetPass/></ResetGuard> </PublicOnly> }></Route>
        <Route path='*' element={<PublicOnly> <PageNotFound /></PublicOnly> }></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

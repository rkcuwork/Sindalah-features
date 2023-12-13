import AuthLayout from './_auth/AuthLayout'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import { Home } from './_root/Pages'
import RootLayout from './_root/RootLayout'
import './globals.css'
import {Routes, Route, } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import EmailVerification from './components/MyPages/Verifications/EmailVerification/EmailVerification'
import PhoneVerification from './components/MyPages/Verifications/PhoneVerification/PhoneVerification'
import EmailVerificationLinkSent from './components/MyPages/Verifications/EmailVerification/EmailVerificationLinkSent'
import AlreadyVerifiedEmail from './components/MyPages/Verifications/EmailVerification/AlreadyVerifiedEmail'
import VerifyEmail from './components/MyPages/Verifications/EmailVerification/VerifyEmail'
import FailedEmailVerification from './components/MyPages/Verifications/EmailVerification/FailedEmailVerification'



function App() {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route  element={<AuthLayout/>}>
          <Route path='Sindalah/sign-in' element={<SignInForm/>}/>
          <Route path='Sindalah/sign-up' element={<SignUpForm/>}/>
        </Route>

        {/* Verification Routes */}
        <Route path='Sindalah/verify'>
          <Route path='email' element={<EmailVerification/>}>
          </Route>
          <Route path='phone' element={<PhoneVerification/>}></Route>
        </Route>
        <Route path='Sindalah/verify/email/sent' element={<EmailVerificationLinkSent/>}></Route>
        <Route path='Sindalah/verify/email/fail' element={<FailedEmailVerification/>}></Route>
        <Route path='Sindalah/verify/email/done' element={<AlreadyVerifiedEmail/>}></Route>
        <Route path='Sindalah/verify-email' element={<VerifyEmail/>}></Route>


        {/* Private Routes */}
        <Route path='Sindalah' element={<RootLayout/>}>
          <Route index element={<Home/>}/>
        </Route>


      </Routes>
      <Toaster/>
    </main>
  )
}

export default App

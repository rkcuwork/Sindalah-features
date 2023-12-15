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
import { paths } from './lib/HelperFunctions/Path'



function App() {

  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route  element={<AuthLayout/>}>
          <Route path={paths.signin} element={<SignInForm/>}/>
          <Route path={paths.signup} element={<SignUpForm/>}/>
        </Route>

        {/* Verification Routes */}
        <Route path={paths.verification}>
          <Route path={paths.verification_email} element={<EmailVerification/>}>
          </Route>
          <Route path={paths.verification_phone} element={<PhoneVerification/>}></Route>
        </Route>
        <Route path={paths.verification_email_sent} element={<EmailVerificationLinkSent/>}></Route>
        <Route path={paths.verification_email_fail} element={<FailedEmailVerification/>}></Route>
        <Route path={paths.verification_email_done} element={<AlreadyVerifiedEmail/>}></Route>
        <Route path={paths.verification_verifyemail} element={<VerifyEmail/>}></Route>


        {/* Private Routes */}
        <Route path={paths.base} element={<RootLayout/>}>
          <Route index element={<Home/>}/>
        </Route>


      </Routes>
      <Toaster/>
    </main>
  )
}

export default App

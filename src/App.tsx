import AuthLayout from './_auth/AuthLayout'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import { AllUsers, CreatePost, Explore, Home, Post, Profile, Saved, UpdatePost, UpdateProfile } from './_root/Pages'
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
import ForgotPassword from './components/MyPages/ForgotPassword/ForgotPassword'
import ForgotPasswordReset from './components/MyPages/ForgotPassword/ForgotPasswordReset'
import LinkSentForgotPassword from './components/MyPages/ForgotPassword/LinkSentForgotPassword'
import PasswordUpdated from './components/MyPages/ForgotPassword/PasswordUpdated'
import SignOut from './components/MyPages/SignOut/SignOut'



function App() {

  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route  element={<AuthLayout/>}>
          <Route path={paths.signin} element={<SignInForm/>}/>
          <Route path={paths.signup} element={<SignUpForm/>}/>
          <Route path={paths.signout} element={<SignOut/>}/>
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

        {/* Forgot-Password Routes */}
        <Route path={paths.forgotpassword} element={<ForgotPassword/>}></Route>
        <Route path={paths.forgotpassword_reset} element={<ForgotPasswordReset/>}></Route>
        <Route path={paths.forgotpassword_emailsent} element={<LinkSentForgotPassword/>}></Route>
        <Route path={paths.forgotpassword_updated} element={<PasswordUpdated/>}></Route>


        {/* Private Routes */}
        <Route path={paths.main} element={<RootLayout/>}>
          <Route index element={<Home/>}/>
          <Route path={paths.explore} element={<Explore/>}/>
          <Route path={paths.saved} element={<Saved/>}/>
          <Route path={paths.allusers} element={<AllUsers/>}/>
          <Route path={paths.createpost} element={<CreatePost/>}/>
          <Route path={paths.updatepost} element={<UpdatePost/>}/>
          <Route path={paths.post} element={<Post/>}/>
          <Route path={paths.profile} element={<Profile/>}/>
          <Route path={paths.updateprofile} element={<UpdateProfile/>}/>
        </Route>


      </Routes>
      <Toaster/>
    </main>
  )
}

export default App

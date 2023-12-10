import AuthLayout from './_auth/AuthLayout'
import SignInForm from './_auth/forms/SignInForm'
import SignUpForm from './_auth/forms/SignUpForm'
import { Home } from './_root/Pages'
import RootLayout from './_root/RootLayout'
import './globals.css'
import {Routes, Route} from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"


function App() {

  const secret = {projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url:import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,}

  console.log("project id - > ",secret.projectId);
  console.log("storage id - > ",secret.storageId);

  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout/>}>
          <Route path='Sindalah/sign-in' element={<SignInForm/>}/>
          <Route path='Sindalah/sign-up' element={<SignUpForm/>}/>
        </Route>

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

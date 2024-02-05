import { paths } from "@/lib/HelperFunctions/Path"
import { Link } from "react-router-dom"

// const SignOut = () => {
//   return (
//     <div className="flex flex-center justify-center items-center gap-5 m-auto flex-col">
//         <h1>Sign Out Successfull</h1>
//         <h2>Sign in again to continue</h2>
//         <Link to={paths.signin} className="  text-blue-500 hover:underline">Sign in </Link>
//     </div>
//   )
// }


// const SignOut = () => {
//   return (
//     <div className="flex flex-col items-center justify-center gap-5 m-auto max-w-md p-8 bg-primary-500 rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-black">Sign Out Successful</h1>
//       <h2 className="text-lg text-gray-600">Sign in again to continue</h2>
//       <Link to={paths.signin} className="text-blue-500 hover:text-blue-700 hover:underline mt-4">
//         Sign in
//       </Link>
//     </div>
//   );
// };

const SignOut = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 m-auto max-w-md p-8 bg-primary-500 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-black">Sign Out Successful</h1>
      <h2 className="text-lg text-gray-800">Sign in again to continue</h2>
      <Link to={paths.signin} className="text-white hover:text-white-400 hover:underline mt-4">
        Sign in
      </Link>
    </div>
  );
};

export default SignOut
import Spinner from "@/components/MyConponents/Spinner"
import Loader from "@/components/Shared/Loader";


const RootLayout = () => {
  return (
    <div className="flex-center gap-2">
      <Spinner/>
      <Loader/>
      


    </div>
  )
}

export default RootLayout
import { paths } from "@/lib/HelperFunctions/Path"


const Loader = () => {
  return (
    <div className="flex-center w-full">
        <img src={`${paths.base}/assets/icons/loader.svg`} alt="loader" width={24} height={24} />
    </div>
  )
}

export default Loader
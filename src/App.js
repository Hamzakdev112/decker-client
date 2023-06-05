import { useEffect } from "react";
import { getMe } from "./apiCalls/userApis";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Routing from "./layouts/Routes/Routing";
import { PropagateLoader } from "react-spinners";
function App() {
  const dispatch = useDispatch()
  const {isFetching} = useSelector(state=>state.user)
  useEffect(()=>{
       getMe(dispatch)
  }, [dispatch])

  return (
    <>
    {
      isFetching ?  <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
      <PropagateLoader color='red' />
      </div> :
      <div>
          <ToastContainer
          position="bottom-left"
          autoClose={1000}
          limit={10}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          theme="colored"
          toastClassName="text-[black] bg-[white] boxshadow"
          />
            <Routing />
        </div>
        }
          </>
  );
}

export default App;

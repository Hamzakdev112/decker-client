import { useEffect } from "react";
import { getMe } from "./apiCalls/userApis";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Routing from "./layouts/Routes/Routing";
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
       getMe(dispatch)
  }, [dispatch])

  return (
        <div>
          <ToastContainer
          position="bottom-left"
          autoClose={1000}
          limit={10}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          theme="dark"
          />
            <Routing />
        </div>
  );
}

export default App;

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import { getMe } from "./apiCalls/userApis";
import { useDispatch, useSelector } from "react-redux";
import Space from "./components/spaces/Space";
import List from "./components/spaces/list/List";
import Board from "./components/spaces/board/Board";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.user)
  useEffect(()=>{
       getMe(dispatch)
  }, [dispatch])

  return (
        <div>
          <ToastContainer />
            <Routes>
              {
                // user &&
                <Route   path="/" element={user ?<Home /> : <Account />} >
              <Route index  element={<h1>test</h1>} />
              <Route path="space/:id" element={<Space />}>
                <Route path="list" element={<List />} />
                <Route path="board" element={<Board />} />
              </Route>
            </Route>
            }
              <Route path="*" element={<h1>path not found</h1>}/>
            { <Route path="/account" element={<Account />} />}
            </Routes>
        </div>
  );
}

export default App;

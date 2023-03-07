import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar/calendar";
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
              <Route index  element={<Dashboard />} />
              <Route path="team" element={<Team />} />
              <Route path="space/:id" element={<Space />}>
                <Route path="list" element={<List />} />
                <Route path="board" element={<Board />} />
              </Route>
              <Route path="form" element={<Form />} />
              <Route path="bar" element={<Bar />} />
              <Route path="pie" element={<Pie />} />
              <Route path="line" element={<Line />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="calendar" element={<Calendar />} />
              <Route path="geography" element={<Geography />} />
            </Route>
            }
              <Route path="*" element={<h1>path not found</h1>}/>
            { <Route path="/account" element={<Account />} />}
            </Routes>
        </div>
  );
}

export default App;

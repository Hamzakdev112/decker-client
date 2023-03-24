import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../../pages/Home";
import Account from "../../pages/Account";
import Space from "../../components/spaces/Space";
import Board from "../../components/spaces/board/Board";
import List from "../../components/spaces/list/List";
import CreateSpace from "../../components/spaces/createspace/CreateSpace";
import VerifyInvite from "../../components/VerifyInvite";
import Settings from "../../components/spaces/settings/Settings";
import NotFound from "../../components/NotFound";
import Test from "../../components/spaces/Test";

function Routing() {
    const { user } = useSelector(state => state.user)
    return (
        <Routes>
            <Route path="/" element={user ? <Home /> : <Account />} >
                <Route index element={<h1>Home Page</h1>} />
                <Route path="space/:id" element={<Space />}>
                <Route path="list" element={<List />} />
                <Route path="board" element={<Board />} />
                <Route path="settings" element={<Settings />} />
            </Route>
                <Route path="createSpace" element={<CreateSpace />} />
            </Route>
            
            <Route path="/spaces/invitation/:spaceId/:token" element={user ? <VerifyInvite />:<Account />} />
            <Route path="*" element={<Test />} />
        </Routes>
    );
}

export default Routing;

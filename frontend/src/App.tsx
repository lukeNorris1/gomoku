import { Route, Routes } from "react-router-dom";
import { Header, UserProvider, BoardProvider } from "./components";
import {
  Home,
  Login,
  Game,
  GameHistory,
  GameHistoryDetails,
  SignUp,
} from "./pages";

import "./App.css";

function App() {
  return (
    <>
      <UserProvider>
        <BoardProvider>
          <main className="main">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="Login" element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="Game/" element={<Game />} />
              <Route path="GameHistory" element={<GameHistory />} />
              <Route path="/game/:boardId" element={<GameHistoryDetails />} />
            </Routes>
          </main>
        </BoardProvider>
      </UserProvider>
    </>
  );
}

export default App;

import { useContext } from "react";
import { UserContext } from "../context";

import style from "./Header.module.css";

export default function Header() {
  const { user, logout } = useContext(UserContext);

  const getActions = () => {
    if (user) {
      return (
        <>
          <button className={style.action}>
            <a href="/gameHistory"> Games</a>
          </button>
          <button
            className={style.action}
            onClick={() => {
              logout();
            }}
          >
            <a href="/"> Logout</a>
          </button>
        </>
      );
    } else {
      return window.location.pathname !== "/login" ? (
        <button className={style.action}>
          <a href="/login">Login</a>
        </button>
      ) : (
        <button className={style.action}>
          <a href="/sign-up">Sign Up</a>
        </button>
      );
    }
  };

  return (
    <header className={style.header}>
      <div className={style.container}>
        <a href="/">GOMOKU</a>
        <div className={style.actions}>{getActions()}</div>
      </div>
    </header>
  );
}

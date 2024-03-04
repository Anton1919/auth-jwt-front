import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import "./App.css";
import LoginForm from "./components/LoginForm";
import s from "./components/LoginForm.module.css";
import { IUser } from "./types/auth";
import { UserService } from "./services/UserService";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      if (store.isAuth) {
        const response = await UserService.fetchUsers();
        setUsers(response.data);
        console.log(response);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }

  if (store.isLoading) {
    return (
      <div className="App">
        <h1>Loading ...</h1>{" "}
      </div>
    );
  }

  if (!store.isAuth) {
    return (
      <div className="App">
        <h1>
          {store.isAuth ? (
            <span>
              Пользователь <span style={{ color: "red" }}>{store.user.email}</span> авторизован !
            </span>
          ) : (
            "Вы не автризованы !"
          )}
        </h1>
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth ? (
          <span>
            Пользователь <span style={{ color: "red" }}>{store.user.email}</span> авторизован !
          </span>
        ) : (
          "Вы не автризованы !"
        )}
      </h1>
      <h1>
        {store.user.isActivated ? "Аккаунт подтвержден" : "Подтвертиде ваше аккаунт на почте"}
      </h1>
      <button className={s.button} onClick={() => store.logout()}>
        Log out
      </button>
      <button className={s.button} onClick={() => getUsers()}>
        Get users
      </button>

      <div>{users.length ? users.map((el) => <p key={el.email}>{el.email}</p>) : []}</div>
    </div>
  );
}

export default observer(App);

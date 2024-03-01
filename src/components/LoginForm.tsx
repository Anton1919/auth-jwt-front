import { FC, useContext, useState } from "react";
import s from "./LoginForm.module.css";
import { Context } from "..";

export const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  return (
    <div className={s.form}>
      <input
        className={s.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <input
        className={s.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <div className={s.buttonsWrapper}>
        <button className={s.button} onClick={() => store.registration(email, password)}>
          Sign Up
        </button>
        <button className={s.button} onClick={() => store.login(email, password)}>
          Sign In
        </button>
      </div>
    </div>
  );
};

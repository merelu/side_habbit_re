import { useAppDispatch } from "@store/hooks";
import useInput from "@utils/useInput";
import React, { useCallback } from "react";
import { loginUser } from "@_actions/user_action";

function LoginPage() {
  const dispatch = useAppDispatch();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      let body = {
        email,
        password,
      };
      dispatch(loginUser(body)).payload.then((response) => {
        if (response.playload.loginSuccess) {
        } else {
          alert("Error");
        }
      });
    },
    [dispatch, email, password]
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={email} onChange={onChangeEmail} />
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;

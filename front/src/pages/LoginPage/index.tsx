import { useAppDispatch, useAppSelector } from "@store/hooks";
import useInput from "@utils/useInput";
import { logInUser } from "@_actions/user_action";
import React, { useCallback, useEffect } from "react";

function LoginPage() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.user);
  const [email, onChangeEmail, setEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const body = {
        email,
        password,
      };
      dispatch(logInUser(body));
    },
    [dispatch, email, password]
  );
  useEffect(() => {
    setEmail(userData?.email ? userData.email : "");
  }, [userData?.email, setEmail]);

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

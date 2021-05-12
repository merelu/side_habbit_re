import { useAppDispatch } from "@store/hooks";
import useInput from "@utils/useInput";
import { registerUser } from "@_actions/user_action";
import React, { useCallback } from "react";

function RegisterPage() {
  const dispatch = useAppDispatch();
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [confirmPassword, onChangeConfirmPassword] = useInput("");
  const [name, onChangeName] = useInput("");

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const body = {
        email,
        password,
        name,
      };
      if (password.length < 5) {
        alert("비밀번호를 5글자 이상 작성해주세요");
        return;
      }
      if (password !== confirmPassword) {
        alert("비밀번호를 재확인하세요");
        return;
      } else {
        dispatch(registerUser(body));
      }
    },
    [confirmPassword, dispatch, email, name, password]
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
        <label>Name</label>
        <input type="text" value={name} onChange={onChangeName} />
        <label>Password</label>
        <input type="password" value={password} onChange={onChangePassword} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;

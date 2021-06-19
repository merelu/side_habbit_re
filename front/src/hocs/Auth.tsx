import { push } from "connected-react-router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { authUser } from "../_actions/user_actions";
import { occurError } from "../_reducers/alertSlice";

function Auth(
  SpecificComponent: React.FC,
  option: boolean | null,
  adminRoute = null
) {
  //option
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인한 유저는 출입이 불가능한 페이지
  const AuthenticationCheck = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
      const auth = async () => {
        const resultAction = await dispatch(authUser());
        if (authUser.fulfilled.match(resultAction)) {
          if (!option) {
            dispatch(push("/"));
          }
        } else {
          if (resultAction.payload) {
            if (option) {
              dispatch(occurError(resultAction.payload.errorMessage));
              dispatch(push("/login"));
            }
          }
        }
      };
      if (option !== null) {
        auth();
      }
    }, [dispatch]);

    return <SpecificComponent />;
  };

  return AuthenticationCheck;
}

export default Auth;

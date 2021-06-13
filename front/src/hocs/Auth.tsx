import { goBack, push } from "connected-react-router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { authUser } from "../_actions/user_actions";

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
      dispatch(authUser()).then((response) => {
        if (!response.payload) {
          if (option) {
            dispatch(push("/login"));
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            dispatch(push("/"));
          } else {
            if (option === false) {
              dispatch(push("/"));
            }
          }
        }
      });
    }, [dispatch]);

    return <SpecificComponent />;
  };

  return AuthenticationCheck;
}

export default Auth;

import React, { useMemo } from "react";
import { AuthApiFactory, UsersApiFactory, LoginDto, RegisterDto } from "../api";
import { useMutation, useQuery, useQueryClient } from "react-query";

async function postRegister(registerDto: RegisterDto) {
  const { data } = await AuthApiFactory().authControllerRegister(registerDto);
  return data;
}

async function postLogin(loginDto: LoginDto) {
  const { data } = await AuthApiFactory().authControllerLogin(loginDto);
  return data;
}

async function postLogout() {
  const { data } = await AuthApiFactory().authControllerLogout();
  return data;
}

async function getMe() {
  const { data } = await UsersApiFactory().usersControllerMe();
  return data;
}

const Auth: React.FC = () => {
  const { data: me, isLoading } = useQuery("me", getMe, { retry: 0 });

  const queryClient = useQueryClient();

  const login = useMutation(postLogin, {
    onSettled: () => queryClient.resetQueries(),
  });

  const logout = useMutation(postLogout, {
    onSettled: () => queryClient.resetQueries(),
  });

  const register = useMutation(postRegister, {
    onSettled: () => queryClient.resetQueries(),
  });

  const loading = useMemo(
    () =>
      isLoading || login.isLoading || logout.isLoading || register.isLoading,
    [isLoading, login.isLoading, logout.isLoading, register.isLoading]
  );

  if (loading) {
    return <span>Loading...</span>;
  }

  if (me) {
    return <button onClick={() => logout.mutate()}>logout</button>;
  }

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!(e.target instanceof HTMLFormElement)) {
            return;
          }
          const formData = new FormData(e.target);
          const registerDto: RegisterDto = {
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
            confirm: formData.get("confirm")?.toString() ?? "",
          };
          register.mutate(registerDto);
        }}
      >
        <fieldset>
          <legend>Register</legend>
          <input type="email" name="email" placeholder="email" />
          <input type="password" name="password" placeholder="password" />
          <input type="password" name="confirm" placeholder="confirm" />
          <input type="submit" />
        </fieldset>
      </form>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (!(e.target instanceof HTMLFormElement)) {
            return;
          }
          const formData = new FormData(e.target);
          const loginDto: LoginDto = {
            email: formData.get("email")?.toString() ?? "",
            password: formData.get("password")?.toString() ?? "",
          };
          login.mutate(loginDto);
        }}
      >
        <fieldset>
          <legend>Login</legend>
          <input id="name" type="email" name="email" placeholder="email" />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
          />
          <input type="submit" />
        </fieldset>
      </form>
    </>
  );
};

export default Auth;

import React from "react";
import { USER_POST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import Input from "../Forms/Input";
import Head from "../Helper/Head";
import { ReactComponent as Eye } from "../../Assets/eye.svg";
import { ReactComponent as ClosedEye } from "../../Assets/closedEye.svg";
import styles from "./LoginCreate.module.css";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const [passwordShown, setPasswordShown] = React.useState(false);

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
  }

  const passwordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <section className="animeLeft">
      <Head title="Criar conta" />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="email" name="email" {...email} />
        <div className={styles.passWrapper}>
          <Input
            label="Senha"
            type={passwordShown ? "text" : "password"}
            name="password"
            {...password}
          />
          <i onClick={passwordVisiblity}>
            {passwordShown ? <ClosedEye /> : <Eye />}
          </i>
        </div>{" "}
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;

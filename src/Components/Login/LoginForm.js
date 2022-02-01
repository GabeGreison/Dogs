import React from "react";
import { Link } from "react-router-dom";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import { UserContext } from "../../UserContext";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesBtn from "../Forms/Button.module.css";
import Head from "../Helper/Head";
import { ReactComponent as Eye } from "../../Assets/eye.svg";
import { ReactComponent as ClosedEye } from "../../Assets/closedEye.svg";

const LoginForm = () => {
  const username = useForm();
  const password = useForm();
  const [passwordShown, setPasswordShown] = React.useState(false);

  const passwordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const { userLogin, error, loading } = React.useContext(UserContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />

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
        </div>
        {loading ? (
          <Button disabled>Carregando </Button>
        ) : (
          <Button>Entrar</Button>
        )}
        <Error error={error} />
      </form>
      <Link className={styles.perdeu} to="/login/perdeu">
        Perdeu a Senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/criar">
          Cadastro
        </Link>
      </div>
    </section>
  );
};

export default LoginForm;

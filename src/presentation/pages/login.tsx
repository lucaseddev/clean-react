import React from 'react';
import Styles from './login-styles.scss';
import {
  Spinner,
  LoginHeader,
  Footer,
  Input,
  Button,
} from '@/presentation/components';

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>

        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input name="password" type="password" placeholder="Digite sua senha" />

        <Button type="submit">Entrar</Button>
        <span className={Styles.link}>Criar conta</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>

      <Footer />
    </div>
  );
};

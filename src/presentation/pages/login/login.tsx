import React, { useState } from 'react';
import Styles from './login-styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  Button,
  FormStatus,
} from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';

export const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',
  });

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input
            errorMessage={errorState.email}
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
          />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
            errorMessage={errorState.password}
          />

          <Button
            className={Styles.submit}
            data-testid="submit"
            type="submit"
            disabled>
            Entrar
          </Button>
          <span className={Styles.link}>Criar conta</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
};

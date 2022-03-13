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

type StateProps = {
  isLoading: boolean;
  errorMessage: string;
};

export const Login: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: '',
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input name="email" type="email" placeholder="Digite seu e-mail" />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />

          <Button type="submit">Entrar</Button>
          <span className={Styles.link}>Criar conta</span>

          <FormStatus errorMessage="Erro" />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
};

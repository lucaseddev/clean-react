import {
  Button,
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Styles from './signup.styles.scss';

export const SignUp: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
  });

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input
            name="name"
            type="text"
            placeholder="Digite seu nome"
            errorMessage={state.nameError}
          />
          <Input
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            errorMessage={state.emailError}
          />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
            errorMessage={state.passwordError}
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Repita sua senha"
            errorMessage={state.passwordConfirmationError}
          />

          <Button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit">
            Entrar
          </Button>
          <span
            // to="/login"
            className={Styles.link}>
            Voltar para Login
          </span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
};

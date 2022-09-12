import { Button, Footer, FormStatus, Input, LoginHeader } from '@/presentation/components';
import { FormContext } from '@/presentation/contexts';
import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './signup.styles.scss';

export const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state: {} }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input name="name" type="text" placeholder="Digite seu nome" />
          <Input name="email" type="email" placeholder="Digite seu e-mail" />
          <Input
            name="password"
            type="password"
            placeholder="Digite sua senha"
          />
          <Input
            name="passwordConfirmation"
            type="password"
            placeholder="Repita sua senha"
          />

          <Button className={Styles.submit} type="submit">
            Entrar
          </Button>
          <Link to="/login" className={Styles.link}>
            Voltar para Login
          </Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  );
};

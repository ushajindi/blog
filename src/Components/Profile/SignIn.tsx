import React, { useEffect } from 'react';
import { Button, Input, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signIn } from '../../ApiService/AuthService';
import { UIUser } from '../../store/Reducers/UserReducer/user';
import './Signup.scss';

interface FormData extends UIUser {
  email: string;
  password: string;
}

type PropsType = {};
export const SignIn: React.FC<PropsType> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { error, auth } = useAppSelector((state) => state.userStore);
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    setError,
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      email: '',
    },
  });

  useEffect(() => {
    if (auth) {
      history.push('/articles');
    }
    if (error.code) {
      setError('email', {
        type: 'server',
        message: error.message,
      });
    }
  }, [error.code, error.message, auth]);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      signIn({
        user: data,
        token: undefined,
      })
    );
  };
  return (
    <div className="signup">
      <div className="signup_inner">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="signup_inner_form">
          <Controller
            control={control}
            render={({ field }) => {
              return (
                <>
                  <p className="signup_inner_form_item_label">Email Address</p>
                  <Input
                    {...register('email', {
                      required: 'This is required.',
                      pattern: {
                        value:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Incorrect email',
                      },
                    })}
                    {...field}
                    placeholder="Email"
                    status={errors.email ? 'error' : undefined}
                  />
                  <div className="signup_inner_form_item_error">
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ message }) => (
                        <Typography.Text type="danger">
                          {message}
                        </Typography.Text>
                      )}
                    />
                  </div>
                </>
              );
            }}
            name="email"
          />
          <Controller
            rules={{
              required: 'This is required.',
              min: 6,
            }}
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <p className="signup_inner_form_item_label">Password</p>
                  <Input.Password
                    status={errors.password ? 'error' : undefined}
                    {...register('password', {
                      required: 'This is required.',
                      pattern: {
                        value: /^[a-zA-Z0-9_-]+$/,
                        message:
                          'the password must contain Latin letters and numbers and symbols',
                      },
                      minLength: {
                        value: 6,
                        message: 'Min length 6 symbols',
                      },
                    })}
                    {...field}
                    placeholder="Password"
                  />
                  <div className="signup_inner_form_item_error">
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => (
                        <Typography.Text type="danger">
                          {message}
                        </Typography.Text>
                      )}
                    />
                  </div>
                </>
              );
            }}
          />
          <div className="signup_inner_form_item_btn">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useEffect } from 'react';
import { Button, Input, Typography } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signUp } from '../../ApiService/AuthService';
import './Signup.scss';

type FormData = {
  username: string;
  email: string;
  password: string;
  passwordRepeat: string;
  agreement: boolean;
  server: string;
};
export const SignUp: React.FC = () => {
  const useRedirect = useHistory();
  const dispatch = useAppDispatch();
  const { error, auth } = useAppSelector((state) => state.userStore);
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<FormData>();

  useEffect(() => {
    if (auth) {
      useRedirect.push('/articles');
    }
  }, [auth]);
  useEffect(() => {
    if (auth) {
      useRedirect.push('/articles');
    }
  }, []);

  const onSubmit = ({ username, email, password }: FormData) => {
    dispatch(
      signUp({
        user: { email, password, username },
      })
    );
  };
  return (
    <div className="signup">
      <div className="signup_inner">
        <h2>Create new account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="signup_inner_form">
          <div className="signup_inner_form_item_error">
            {error.message && (
              <Typography.Text type="danger">{error.message}</Typography.Text>
            )}
          </div>
          <Controller
            control={control}
            render={({ field }) => {
              return (
                <>
                  <p className="signup_inner_form_item_label">Username</p>
                  <Input
                    status={errors.username ? 'error' : undefined}
                    {...register('username', {
                      required: 'This is required.',
                      minLength: {
                        value: 3,
                        message:
                          'username должен быть от 3 до 20 символов (включительно)',
                      },
                      maxLength: {
                        value: 20,
                        message:
                          'username должен быть от 3 до 20 символов (включительно)',
                      },
                    })}
                    {...field}
                    placeholder="Username"
                  />
                  <div className="signup_inner_form_item_error">
                    <ErrorMessage
                      errors={errors}
                      name="username"
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
            name="username"
          />
          <Controller
            name="email"
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
          />

          <Controller
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
                      minLength: {
                        value: 6,
                        message:
                          'password должен быть от 6 до 40 символов (включительно)',
                      },
                      maxLength: {
                        value: 40,
                        message:
                          'password должен быть от 6 до 40 символов (включительно)',
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
          <Controller
            name="passwordRepeat"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <p className="signup_inner_form_item_label">
                    Password Confirm
                  </p>
                  <Input.Password
                    status={errors.passwordRepeat ? 'error' : undefined}
                    {...register('passwordRepeat', {
                      required: 'This is required.',
                      validate: (value, formValues) => {
                        return (
                          value === formValues.password ||
                          'Passwords do not match'
                        );
                      },
                    })}
                    {...field}
                    placeholder="password confirm"
                  />
                  <div className="signup_inner_form_item_error">
                    <ErrorMessage
                      errors={errors}
                      name="passwordRepeat"
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
          <div className="signup_inner_form_item_line" />
          <Controller
            name="agreement"
            control={control}
            render={() => {
              return (
                <div className="signup_inner_form_item_agreement">
                  <input
                    {...register('agreement', {
                      validate: (value) => {
                        if (value) {
                          return true;
                        }
                        return 'error';
                      },
                    })}
                    type="checkbox"
                    value={1}
                  />
                  <Typography.Text
                    type={errors.agreement ? 'danger' : undefined}
                  >
                    I have read the <a>agreement</a>
                  </Typography.Text>
                </div>
              );
            }}
          />

          <div className="signup_inner_form_item_btn">
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </div>
        </form>
        <p className="signup_inner_signin">
          Already have an account?<NavLink to="/sign-in">Sign In.</NavLink>{' '}
        </p>
      </div>
    </div>
  );
};

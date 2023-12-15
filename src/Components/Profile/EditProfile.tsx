import React from 'react';
import { Button, Input, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { UIUser } from '../../store/Reducers/UserReducer/user';
import './Signup.scss';
import { editProfile } from '../../ApiService/AuthService';

type PropsType = {};
export const EditProfile: React.FC<PropsType> = () => {
  const {
    user: { username, email, image },
  } = useAppSelector((state) => state.userStore);
  const dispatch = useAppDispatch();
  const {
    formState: { errors },
    control,
    handleSubmit,
    register,
  } = useForm<UIUser>({
    defaultValues: {
      username,
      email,
      image,
    },
  });
  const onSubmit = (data: UIUser) => {
    dispatch(editProfile(data));
  };
  return (
    <div className="signup">
      <div className="signup_inner">
        <h2>Edit profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="signup_inner_form">
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
            control={control}
            render={({ field }) => {
              return (
                <>
                  <p className="signup_inner_form_item_label">
                    Avatar image (url)
                  </p>
                  <Input
                    status={errors.image ? 'error' : undefined}
                    {...register('image', {
                      required: false,
                      pattern: {
                        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                        message: 'Некорентный URL',
                      },
                    })}
                    {...field}
                    placeholder="url"
                  />
                  <div className="signup_inner_form_item_error">
                    <ErrorMessage
                      errors={errors}
                      name="image"
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
            name="image"
          />
          <div className="signup_inner_form_item_btn">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

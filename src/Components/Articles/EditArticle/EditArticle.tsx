import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
  createArticle,
  updateArticle,
} from '../../../ApiService/ArticleService';
import { UIArticle } from '../../../store/Reducers/ArticlesReducer/articles';
import { TypeIf } from '../helpers/helpers';
import './EditArticle.scss';

type PropsType = {
  type: 'edit' | 'create';
};
type TagType = {
  id: string | number;
  value: string;
};

export const EditArticle: React.FC<PropsType> = ({ type }) => {
  const [sendArticle, setSendArticle] = useState(false);
  const history = useHistory();
  const { article, status } = useAppSelector((state) => state.articleStore);
  const { auth } = useAppSelector((state) => state.userStore);
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<TagType[]>([]);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UIArticle>({
    defaultValues: {
      title: TypeIf(article?.title, type),
      description: TypeIf(article?.description, type),
      body: TypeIf(article?.body, type),
      tagList: tags.map((el) => el.value),
    },
  });
  useEffect(() => {
    if (article?.slug && type !== 'edit') {
      history.push(`/article/${article?.slug}`);
    }
  }, [article?.slug]);
  useEffect(() => {
    if (!auth) {
      history.push('/sign-in');
    }
  }, [auth]);
  useEffect(() => {
    if (!article && type !== 'create') {
      history.push('/articles');
    }

    if (
      article?.tagList.length !== 0 &&
      article &&
      type === 'edit' &&
      tags.length === 0
    ) {
      setTags((prevState) => {
        const update = [...prevState];
        article.tagList.forEach((el, index) => {
          setValue(`tagList.${index}`, el);
          update[index] = { id: index, value: el };
        });
        return update;
      });
    }
  }, []);
  useEffect(() => {
    if (sendArticle && status === 'succeeded') {
      history.push(`/article/${article?.slug}`);
    }
  }, [status]);
  const AddTag = () => {
    const newTag = {
      id: new Date().getMilliseconds() + Math.random() * 100,
      value: '',
    };
    setTags((prevState) => {
      return [...prevState, newTag];
    });
  };

  const DeleteTag = (id: string | number, index: number) => {
    setValue(`tagList.${index}`, '');
    setTags((prevState) => {
      return prevState.filter((el) => el.id !== id);
    });
  };
  const onSubmit = (data: UIArticle) => {
    if (type === 'edit') {
      dispatch(
        updateArticle({
          article: {
            ...data,
            tagList: data.tagList.filter(Boolean),
          },
          slug: article ? article?.slug : '',
        })
      );
      setSendArticle(true);
    } else {
      dispatch(
        createArticle({ ...data, tagList: data.tagList.filter(Boolean) })
      );
    }
  };

  return (
    <div className="editaricle">
      <h3>{type === 'edit' ? 'Edit article' : 'Create article'}</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="editaricle_form"
        name="editArticle"
      >
        <Controller
          rules={{ required: 'title is empty' }}
          control={control}
          name="title"
          render={({ field }) => {
            return (
              <>
                <p className="editaricle_form_lebel">Title</p>
                <Input {...field} placeholder="Title" />
                <div className="signup_inner_form_item_error">
                  <ErrorMessage
                    errors={errors}
                    name="title"
                    render={({ message }) => (
                      <Typography.Text type="danger">{message}</Typography.Text>
                    )}
                  />
                </div>
              </>
            );
          }}
        />
        <Controller
          rules={{ required: 'Short descriptor is empty' }}
          name="description"
          control={control}
          render={({ field }) => {
            return (
              <>
                <p className="editaricle_form_lebel">Short description</p>
                <Input {...field} placeholder="Short description" />
                <div className="signup_inner_form_item_error">
                  <div className="signup_inner_form_item_error">
                    <ErrorMessage
                      errors={errors}
                      name="description"
                      render={({ message }) => (
                        <Typography.Text type="danger">
                          {message}
                        </Typography.Text>
                      )}
                    />
                  </div>
                </div>
              </>
            );
          }}
        />
        <Controller
          rules={{ required: 'Text is empty' }}
          control={control}
          name="body"
          render={({ field }) => {
            return (
              <>
                <p className="editaricle_form_lebel">Text</p>
                <TextArea {...field} />
                <div className="signup_inner_form_item_error">
                  <ErrorMessage
                    errors={errors}
                    name="body"
                    render={({ message }) => (
                      <Typography.Text type="danger">{message}</Typography.Text>
                    )}
                  />
                </div>
              </>
            );
          }}
        />
        <p className="editaricle_form_lebel">Tags</p>
        <div className="editaricle_form_tags">
          <div className="editaricle_form_tags_inner">
            {tags.length !== 0 &&
              tags.map((el, index) => {
                return (
                  <div key={el.id}>
                    <Controller
                      rules={{ required: 'tag empty' }}
                      control={control}
                      render={({ field }) => {
                        return (
                          <div>
                            <div className="editaricle_form_tags_inner_tag">
                              <div>
                                <Input
                                  status={
                                    errors.tagList && errors.tagList[index]
                                      ? 'error'
                                      : undefined
                                  }
                                  {...field}
                                />
                                <div className="signup_inner_form_item_error">
                                  <ErrorMessage
                                    errors={errors}
                                    name={`tagList.${index}`}
                                    render={({ message }) => (
                                      <Typography.Text type="danger">
                                        {message}
                                      </Typography.Text>
                                    )}
                                  />
                                </div>
                              </div>

                              <Button
                                onClick={() => {
                                  DeleteTag(el.id, index);
                                }}
                                danger
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        );
                      }}
                      name={`tagList.${index}`}
                    />
                  </div>
                );
              })}
          </div>
          <div className="editaricle_form_tags_btn">
            <Button onClick={AddTag}>Add Tag</Button>
          </div>
        </div>
        <Form.Item style={{ marginBottom: 0 }}>
          <div className="editaricle_form_btn">
            <Button
              loading={status === 'loading'}
              htmlType="submit"
              type="primary"
            >
              Send
            </Button>
          </div>
        </Form.Item>
      </form>
    </div>
  );
};

import { useEffect } from 'react';
import { Spin } from 'antd';
import { Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Article, ArticlesList } from './Components/Articles';
import Header from './Components/Header/Header';
import { SignIn, SignUp, EditProfileHOC } from './Components/Profile';
import './App.css';
import { signIn } from './ApiService/AuthService';

function App() {
  const { articleStore, userStore } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!userStore.auth && token) {
      dispatch(
        signIn({
          endpoint: 'https://blog.kata.academy/api/user',
          user: undefined,
          token,
        })
      );
    }
  }, []);
  return (
    <Spin
      spinning={
        articleStore.status === 'loading' || userStore.status === 'loading'
      }
    >
      <div className="app">
        <Header />
        <Route>
          <Route path="/articles" render={() => <ArticlesList />} />
          <Route path="/sign-in" render={() => <SignIn />} />
          <Route path="/sign-up" render={() => <SignUp />} />
          <Route path="/edit-profile" render={() => <EditProfileHOC />} />
          <Route
            path="/article/:slug"
            render={({ match }) => <Article slug={match.params.slug} />}
          />
        </Route>
      </div>
    </Spin>
  );
}

export default App;

import { useEffect } from 'react';
import { Spin } from 'antd';
import { Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Article, ArticlesList, EditArticle } from './Components/Articles';
import Header from './Components/Header/Header';
import { SignIn, SignUp, EditProfileHOC } from './Components/Profile';
import { signIn } from './ApiService/AuthService';
import './App.css';

function App() {
  const { articleStore, userStore } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!userStore.auth && token) {
      dispatch(
        signIn({
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
          <Route exact path="/" render={() => <ArticlesList />} />
          <Route path="/articles" render={() => <ArticlesList />} />
          <Route path="/sign-in" render={() => <SignIn />} />
          <Route path="/sign-up" render={() => <SignUp />} />
          <Route path="/edit-profile" render={() => <EditProfileHOC />} />
          <Route path="/create" render={() => <EditArticle type="create" />} />
          <Route path="/edit" render={() => <EditArticle type="edit" />} />
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

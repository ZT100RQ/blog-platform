// import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { ListArticles } from './components/ListArticles/ListArticles';
import { SignIn } from './components/SignIn/SignIn';
import { ArticlePage } from './components/ArticlePage/ArticlePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { SignUp } from './components/SignUp/SignUp';
import { loginUser } from './features/userSlice/userSlice';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { ProfilePage } from './components/ProfilePage/ProfilePage';
import { ProtectedProfileRoute } from './components/ProtectedProfileRout/ProtectedProfileRoute';
import { NewArticle } from './components/NewArticle/NewArticle';

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(loginUser());
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ListArticles />} />
        <Route path="/articles" element={<ListArticles />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/articles/:title" element={<ArticlePage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedProfileRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/new-article" element={<NewArticle />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

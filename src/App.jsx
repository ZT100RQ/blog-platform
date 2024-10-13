// import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { ListArticles } from './components/ListArticles/ListArticles';
import { SignInForm } from './components/SignInForm/SignInForm';
import { ArticlePage } from './components/ArticlePage/ArticlePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ListArticles />} />
        <Route path="/articles" element={<ListArticles />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/articles/:title" element={<ArticlePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;

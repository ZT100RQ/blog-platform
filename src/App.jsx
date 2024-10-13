// import styles from './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { ListArticles } from './components/ListArticles/ListArticles';
import { SignInForm } from './components/SignInForm/SignInForm';
import { ArticlePage } from './components/ArticlePage/ArticlePage';
import { PageNotFound } from './components/PageNotFound/PageNotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ListArticles />} />
        <Route path="/articles" element={<ListArticles />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/articles/:title" element={<ArticlePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

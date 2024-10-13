import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';
import styles from '../../components/Layout/Layout.module.scss';

function Layout() {
  return (
    <>
      <header className={styles.Header}>
        <Flex justify="space-between">
          <Link to="/">
            <Button className={styles.Title} type="link" default>
              Realworld Blog
            </Button>
          </Link>
          <div>
            <Link to="/sign-in">
              <Button className={styles.SignIn} type="text">
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button className={styles.SignUp}>Sign Up</Button>
            </Link>
          </div>
        </Flex>
      </header>
      {/* <Outlet /> */}
    </>
  );
}

export { Layout };

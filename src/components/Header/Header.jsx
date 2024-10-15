import { Link } from 'react-router-dom';
import { Button, Flex } from 'antd';
import styles from '../../components/Header/Header.module.scss';
import { HeaderUser } from '../HeaderUser/HeaderUser';
import { useSelector } from 'react-redux';

function Header() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <header className={styles.Header}>
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Button className={styles.Title} type="link" default>
              Realworld Blog
            </Button>
          </Link>
          {user?.username && <HeaderUser />}
          {!user?.username && (
            <div>
              <Link to="/sign-in">
                <Button size="large" className={styles.SignIn} type="text">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="large" className={styles.SignUp}>
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </Flex>
      </header>
    </>
  );
}

export { Header };

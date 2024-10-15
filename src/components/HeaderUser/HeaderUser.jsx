import { Avatar, Button, Flex, Typography } from 'antd';
import defaultAvatar from '../../assets/images/defaultAvatar.svg';
import styles from '../HeaderUser/HeaderUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice/userSlice';
import { Link } from 'react-router-dom';

const { Title } = Typography;

function HeaderUser() {
  const dispatch = useDispatch();
  const handleLogoutButton = () => {
    dispatch(logoutUser());
    localStorage.removeItem('blog-platform-userState');
  };
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Flex align="center" gap={10}>
        <Button className={styles.Create}>Create article</Button>
        <Flex align="center" gap={10}>
          <Link to={'/profile'}>
            <Title className={styles.Title} level={5}>
              {user?.username || ''}
            </Title>
          </Link>
          <Avatar size={40} src={user?.image || defaultAvatar} />
        </Flex>
        <Button onClick={handleLogoutButton} className={styles.Logout} size="large">
          Logout
        </Button>
      </Flex>
    </>
  );
}

export { HeaderUser };

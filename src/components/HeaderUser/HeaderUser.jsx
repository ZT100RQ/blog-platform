import { Avatar, Button, Flex, Typography } from 'antd';
import defaultAvatar from '../../assets/images/defaultAvatar.svg';
import styles from '../HeaderUser/HeaderUser.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/userSlice/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

function HeaderUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogoutButton = () => {
    dispatch(logoutUser());
    localStorage.removeItem('blog-platform-userState');
    navigate('/');
  };
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Flex align="center" gap={10}>
        <Link to={'/new-article'}>
          <Button className={styles.Create}>Create article</Button>
        </Link>
        <Flex align="center" gap={10}>
          <Link to={'/profile'}>
            <Title className={styles.Title} level={5}>
              {user?.username}
            </Title>
          </Link>
          <Link to={'/profile'}>
            <Avatar size={40} src={user?.image || defaultAvatar} />
          </Link>
        </Flex>
        <Button onClick={handleLogoutButton} className={styles.Logout} size="large">
          Logout
        </Button>
      </Flex>
    </>
  );
}

export { HeaderUser };

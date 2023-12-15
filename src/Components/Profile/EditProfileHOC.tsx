import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { EditProfile } from './EditProfile';

export const EditProfileHOC = () => {
  const { auth, status } = useAppSelector((state) => state.userStore);
  const history = useHistory();
  useEffect(() => {
    if (!auth && status !== 'loading') {
      history.push('/sign-in');
    }
  }, [status, auth]);

  return auth ? <EditProfile /> : <>Loading</>;
};

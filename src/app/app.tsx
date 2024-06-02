import { useGetProfile } from '@/packages/auth';
import { Router } from './router';
import { SplashScreen } from '@/libs/components';

const App = () => {
  const { isLoading, isFetching } = useGetProfile();

  if (isLoading || isFetching) return <SplashScreen />;

  return <Router />;
};

export { App };

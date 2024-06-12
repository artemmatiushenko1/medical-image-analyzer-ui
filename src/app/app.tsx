import { useGetProfile } from './libs/queries';
import { Router } from './libs/router/router';
import { SplashScreen } from '@/libs/components';

const App = () => {
  const { isLoading, isFetching } = useGetProfile();

  if (isLoading || isFetching) return <SplashScreen />;

  return <Router />;
};

export { App };

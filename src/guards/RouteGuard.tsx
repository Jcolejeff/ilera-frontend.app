import useStore from 'store';
import { useLocation, Navigate, useOutlet } from 'react-router-dom';
import { planTypes } from 'types';

const RouteGuard = () => {
  const loggedIn = useStore((state) => state.loggedIn);
  const location = useLocation();
  const outlet = useOutlet();
    //   <Navigate
    //   to={`/login`}
    //   replace
    //   state={
    //     {
    //       path: location.pathname,
    //     } as { path: string; failedFrom: planTypes }
    //   }
    // />

  return !loggedIn ? ( outlet ) : (
    outlet
  );
};

export default RouteGuard;

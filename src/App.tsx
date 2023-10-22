import { Routes, Route, Navigate } from 'react-router-dom';
import RouteGuard from 'guards/RouteGuard';
import externalRoute, { innerExternalRoutes } from 'routes/external';
import internalRoute, { innerInternalRoutes } from 'routes/internal';
import ExternalLayout from 'layouts/external-layout';
import AppLayout from 'layouts/app-layout';
import checkOutRoutes from 'routes/checkout';
import { Toaster, resolveValue } from 'react-hot-toast';

function App() {
  // TODO: refresh auth on reload

  return (
    <>
      <Toaster position='top-right'>
        {(t) => (
          <div
            className={`flex ${t.type === 'error' ? `items-center` : `items-start`} ${
              t.visible ? `visible` : `hidden`
            } dark:bg-grey-4 min-w-[14rem] max-w-[22rem] gap-4 rounded-[4px] bg-white p-4 shadow-md dark:shadow-none`}
            style={{
              animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
            }}
          >
            <p
              className={`text-black-3 text-[14px] leading-normal dark:text-white ${
                t.type === 'error' ? `inline` : ``
              }`}
            >
              {resolveValue(t.message, t)}
            </p>
          </div>
        )}
      </Toaster>
      <Routes>
        {checkOutRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} path={`/${i.path}`} element={i.element} />
        ))}
        {innerExternalRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<ExternalLayout />}>
            <Route path={`/${i.path}`} element={i.element} />
          </Route>
        ))}
        {externalRoute?.map((i, idx) => (
          <Route path={`/${i.path}`} element={i.element} key={`${idx}${i?.path}`} />
          // <Route key={`${idx}${i?.path}`} element={<ExternalLayout />}>
          // </Route>
        ))}
        {innerInternalRoutes?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/app/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}
        {internalRoute?.map((i, idx) => (
          <Route key={`${idx}${i?.path}`} element={<AppLayout />}>
            <Route element={<RouteGuard />}>
              <Route path={`/app/${i.path}`} element={i.element} />
            </Route>
          </Route>
        ))}
        <Route path='notfound' element={<></>} />
        <Route path='*' element={<Navigate to='/notfound' replace />} />
      </Routes>
    </>
  );
}

export default App;

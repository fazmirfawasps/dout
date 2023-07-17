import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/redux';
import { Box } from '@mui/material';
import CustomContext from './context/CustomContext';
import Themeprovider from './ThemeProvider';
import ResponsiveAppBar from './components/navbar';
import Loading from './components/LoadingPage';

// Lazy loaded components
const Home = React.lazy(() => import('./pages/home'));
const Host = React.lazy(() => import('./pages/host'));
const Hostproperty = React.lazy(() => import('./pages/Hostproperty'));
const Viewhosted = React.lazy(() => import('./pages/Viewhosted'));
const Editproperty = React.lazy(() => import('./pages/EditHostProperty'));
const SingleProperty = React.lazy(() => import('./layout/SinglwProduct'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const Vediocall = React.lazy(() => import('./pages/vediocall'));
const HostApplyPage = React.lazy(() => import('./host/HostApply'));
const CheckoutSuccess = React.lazy(() => import('./pages/Checkoutsuccess'))
const CancelCheckout = React.lazy(() => import('./pages/Cancel'))
import Userauth from './pages/Userauth';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandler from './pages/ErrorHandler'
import BookingPage from './pages/BookingPage';
import WishList from './pages/Wishlist';
import Chat from './layout/Chat/Chat';
import Reservation from './pages/Reservation';
import ErrorPage from './pages/ErrorPage';
import HostAuth from './pages/HostAuth';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Themeprovider>
            <CustomContext>
              <Router>
                <div className="App">
                  <Box sx={{ overflowX: 'hidden' }}>
                    <ResponsiveAppBar />

                    <Routes>
                      <Route
                        path="/"
                        element={
                          <Suspense fallback={<Loading />}>
                            <Home />
                          </Suspense>
                        }
                      />
                      <Route

                        element={
                          <Suspense fallback={<Loading />}>
                            <Userauth />
                          </Suspense>
                        }
                      >
                        <Route element={<HostAuth />}>

                          <Route
                            path="/viewhosted"
                            element={
                              <Suspense fallback={<Loading />}>
                                <Viewhosted />
                              </Suspense>
                            }
                          />
                          <Route
                            path="/Edit-listed-property/:id"
                            element={
                              <Suspense fallback={<Loading />}>
                                <Editproperty />
                              </Suspense>
                            }
                          />
                          <Route
                            path="/reservation"
                            element={
                              <Suspense fallback={<Loading />}>
                                <Reservation />
                              </Suspense>
                            }
                          />
                        </Route>

                        <Route
                          path="/chat"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Chat />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/vediocall"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Vediocall />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/Bookings"
                          element={<BookingPage />}
                        />
                        <Route
                          path="/wishlist"
                          element={<WishList />}
                        />
                        <Route
                          path="/room/:id"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Vediocall />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/success"
                          element={
                            <Suspense fallback={<Loading />}>
                              <CheckoutSuccess />
                            </Suspense>
                          }
                        />

                        <Route
                          path="/cancel"
                          element={
                            <Suspense fallback={<Loading />}>
                              <CancelCheckout />
                            </Suspense>
                          }
                        />

                        <Route
                          path="/host"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Host />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/add"
                          element={
                            <Suspense fallback={<Loading />}>
                              <Hostproperty />
                            </Suspense>
                          }
                        />

                        <Route
                          path="/hostapply"
                          element={
                            <Suspense fallback={<Loading />}>
                              <HostApplyPage />
                            </Suspense>
                          }
                        />

                        <Route
                          path="/View-SingleProduct/:id"
                          element={
                            <Suspense fallback={<Loading />}>
                              <SingleProperty />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/Profilepage"
                          element={
                            <Suspense fallback={<Loading />}>
                              <ProfilePage />
                            </Suspense>
                          }
                        />
                        <Route
                          path="/searchpage"
                          element={
                            <Suspense fallback={<Loading />}>
                              <SearchPage />
                            </Suspense>
                          }
                        />

                      </Route>
                      <Route path="*" element={<ErrorPage />} />


                    </Routes>
                  </Box>
                </div>
              </Router>
            </CustomContext>
          </Themeprovider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;

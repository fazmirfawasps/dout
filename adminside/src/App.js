import './App.css';
import React, { lazy, Suspense } from 'react';


import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store,persistor } from './redux/redux';
import { Provider } from 'react-redux';
import Loading from './components/LoadingPage';


// import Dashboard from './pages/Dashboard';
// import Comment from './pages/Comment';
// import About from './pages/About';
// import Sidebar from './components/sidebar';
// import Login from './components/login';
const RoomPage = lazy(() => import('./pages/Room'))
const Vediocall = lazy(() => import('./pages/Vediocall'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Comment = lazy(() => import('./pages/Comment'));
const About = lazy(() => import('./pages/About'));
const Sidebar = lazy(() => import('./components/Sidebar'));
const Login = lazy(() => import('./components/Login'));
const Category = lazy(()=>import('./pages/Category'));
const SingleHostDetailPage= lazy(()=>import('./pages/SingleHostDetail'));

const PropertyList = lazy(()=>import('./pages/PropertyList'));
const Hostdetail =lazy(()=>import('./pages/Hostdetailpage'))
import Booking from './pages/Booking';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/'>
              <Route element={<Suspense fallback={<Loading />}><Sidebar /></Suspense>}>
                <Route exact path="/" element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
                <Route exact path="/vediocall" element={<Suspense fallback={<Loading />}><Vediocall /></Suspense>} />
                <Route exact path="/room/:id" element={<Suspense fallback={<Loading />}><RoomPage /></Suspense>} />

                <Route path="dashboard" element={<Suspense fallback={<Loading />}><Dashboard /></Suspense>} />
                <Route path="singlehostdetail/:id" element={<Suspense fallback={<Loading />}><SingleHostDetailPage /></Suspense>} />

                <Route path="about" element={<Suspense fallback={<Loading />}><About /></Suspense>} />
                <Route path="comment" element={<Suspense fallback={<Loading />}><Comment /></Suspense>} />
                <Route path="PropertyList" element={<Suspense fallback={<Loading />}><PropertyList /></Suspense>} />
                <Route path="category" element={<Suspense fallback={<Loading />}><Category /></Suspense>} />
                <Route path="Hostrequest" element={<Suspense fallback={<Loading />}><Hostdetail /></Suspense>} />
                <Route path="Booking" element={<Suspense fallback={<Loading />}><Booking /></Suspense>} />


              </Route>
            </Route>
            <Route path='/login' element={<Suspense fallback={<Loading />}><Login /></Suspense>}></Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>


  );

}

export default App;

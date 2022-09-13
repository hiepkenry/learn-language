import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error, Landing, Register, ProtectedRoute } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  AllJobs,
  Profile,
  SharedLayout,
  Stats,
  AddJob,
  AddWord,
  JlptN1,
  StudyWord
} from './pages/dashboard';
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route index element={<Stats />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='add-word' element={<AddWord />} />
          <Route path='jlpt-N1' element={<JlptN1 />} />
          <Route path='jlpt-N1/studyNewWord' element={<StudyWord />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='register' element={<Register />} />
        <Route path='landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}

export default App;

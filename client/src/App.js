import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Landing, Error, Register, ProtectedRoute, ProtectedDashboard } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Profile,
  // AddJob,
  AddVocab,
  AllVocabs,
  Vocabs,
  Stats,
  SharedLayout,
  AddGrammar,
  AllGrammars,
  LearnVocabs,
  LearnGrammar,
} from './pages/dashboard';
// import ShowText from './components/Learning/ShowText';

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
          }
        >
          <Route index element={<Stats />} />
          <Route path='tu-vung' element={<Vocabs />} >

          </Route>
          <Route path='tu-vung/shadowing' element={<LearnVocabs />} />
          <Route path='ngu-phap/shadowing' element={<LearnGrammar />} />
          <Route path='ngu-phap' element={<AllGrammars />}>

          </Route>
          <Route path='add-grammar' element={<ProtectedDashboard> <AddGrammar /></ProtectedDashboard>} />
          <Route path='add-vocab' element={<ProtectedDashboard> <AddVocab /></ProtectedDashboard>} />
          <Route path='all-vocab' element={<ProtectedDashboard> <AllVocabs /></ProtectedDashboard>} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}

export default App;

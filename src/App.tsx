import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '@services/redux/store'
import Reports from './pages/Reports'
import Files from './pages/Files'
import Settings from './pages/settings'
import { Suspense } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import BounceLoader from 'react-spinners/BounceLoader'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-screen">
                <BounceLoader color="#d6a936" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Reports />} />
              <Route path="/files" element={<Files />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <ToastContainer position="bottom-right" />
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App

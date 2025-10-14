
import './App.css'
import Footer from './Components/common/Footer.jsx'
import Header from './Components/common/Header.jsx'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  

  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
      <ToastContainer />
      
    </>
  )
}

export default App

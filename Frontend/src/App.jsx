import './App.css'
import Footer from './Components/common/Footer.jsx'
import Header from './Components/common/Header.jsx'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from './themes/theme.jsx';

function App() {
  
  return (
    <ThemeProvider> 
      <Header />
      <AppRoutes />
      <Footer />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App
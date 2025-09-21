import './App.css'
import AppRouter from "./AppRouter";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "./context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import './i18n' 


function App() {

  return (
    <>
      <AuthProvider>
        <Toaster />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
        </AuthProvider>
    </>
  )
}

export default App

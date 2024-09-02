import { BrowserRouter,Routes, Route } from "react-router-dom"
import GeradorPdf from "./pages/gerarPdf/GeradorPdf"
import Cabecalho from "./components/cabecalho/Cabecalho"

function App() {


  return (
   <div>
      <BrowserRouter>
        <header>
          <Cabecalho />
        </header>
        <Routes>
          <Route path="/" element={<GeradorPdf />} />
        </Routes>
      </BrowserRouter>

   </div>
  )
}

export default App

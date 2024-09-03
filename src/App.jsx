import { BrowserRouter,Routes, Route } from "react-router-dom"
import GeradorPdf from "./pages/gerarPdf/GeradorPdf"
import Cabecalho from "./components/cabecalho/Cabecalho"
import RodaPe from "./components/rodaPe/RodaPe"

function App() {


  return (
   <div>
      <BrowserRouter>
        <header>
          <Cabecalho />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<GeradorPdf />} />
          </Routes>
        </main>

        <footer>
          <RodaPe />
        </footer>
      </BrowserRouter>

   </div>
  )
}

export default App

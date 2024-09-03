import { BrowserRouter,Routes, Route } from "react-router-dom"

//paginas
import GeradorPdf from "./pages/gerarPdf/GeradorPdf"
import Cabecalho from "./components/cabecalho/Cabecalho"
import RodaPe from "./components/rodaPe/RodaPe"
import Sobre from "./pages/sobre/sobre"


function App() {


  return (
   <div className="app" >
      <BrowserRouter>
        <header>
       
          <Cabecalho />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<GeradorPdf />} />
            <Route path="/sobre" element={<Sobre />} />
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

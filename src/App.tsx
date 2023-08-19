import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurante from "./paginas/administracao/restaurantes/administracaoRestaurante";
import FormularioRestaurante from "./paginas/administracao/restaurantes/formularioRestaurante";
import PaginaBaseAdmin from "./paginas/administracao/paginaBaseAdmin";
import AdministracaoPratos from "./paginas/administracao/pratos/administracaoPratos";
import FormularioPratos from "./paginas/administracao/pratos/formularioPratos";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurante />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPratos />} />
        <Route path="pratos/:id" element={<FormularioPratos />} />
      </Route>
    </Routes>
  );
}

export default App;

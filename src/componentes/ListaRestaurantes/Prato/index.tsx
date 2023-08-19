import { useEffect, useState } from "react";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import estilos from "./Prato.module.scss";

interface PratoProps {
  prato: IPrato;
}

const Prato = ({ prato }: PratoProps) => {
  const [pratos, setPratos] = useState<IPrato[]>();
  useEffect(() => {
    http
      .get<IPrato[]>("/v2/pratos/")
      .then((resposta) => setPratos(resposta.data));
  }, []);
  const remover = (prato: IPrato) => {
    http.delete(`/v2/pratos/${prato.id}/`).then(() => {
      if (pratos) {
        setPratos([...pratos.filter((x) => x.id !== prato.id)]);
      }
    });
  };

  return (
    <div className={estilos.Prato}>
      <div className={estilos.Container}>
        <div>
          <div className={estilos.EfeitoTorcao}>
            <img src={prato.imagem} alt={prato.descricao} />
          </div>
        </div>
      </div>
      <div className={estilos.Conteudo}>
        <h3>{prato.nome}</h3>
        <div className={estilos.Tag}>{prato.tag}</div>
        <div>{prato.descricao}</div>
      </div>
    </div>
  );
};

export default Prato;

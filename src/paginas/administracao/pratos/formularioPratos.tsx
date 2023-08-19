import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Method } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITag";

const FormularioPratos = () => {
  const parametros = useParams();

  const [nomePrato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");

  const [tag, setTag] = useState("");
  const [restaurante, setRestaurante] = useState(0);

  const [imagem, setImagem] = useState<File | null>(null);

  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  /* Params */

  useEffect(() => {
    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`).then((resposta) => {
        setNomePrato(resposta.data.nome);
        setDescricao(resposta.data.descricao);
        setTag(resposta.data.tag);
        setRestaurante(resposta.data.restaurante);
      });
    }
  }, [parametros]);

  /* Tags */

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("tags/")
      .then((respota) => setTags(respota.data.tags));
    http
      .get<IRestaurante[]>("restaurantes/")
      .then((respota) => setRestaurantes(respota.data));
  }, []);

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http
        .put(`pratos/${parametros.id}/`, {
          nome: nomePrato,
        })
        .then(() => {
          alert("Prato cadastrado com sucesso!");
        });
    } else {
      http
        .post("pratos/", {
          nome: nomePrato,
        })
        .then(() => {
          alert("Prato cadastrado com sucesso!");
        });
    }

    const formData = new FormData();

    formData.append("nome", nomePrato);
    formData.append("descricao", descricao);

    formData.append("tag", tag);

    formData.append("restaurante", restaurante.toString());

    if (imagem) {
      formData.append("imagem", imagem);
    }

    const url = parametros.id ? `pratos/${parametros.id}/` : "pratos/";
    const method = parametros.id ? "PUT" : "POST";

    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setNomePrato("");
        setDescricao("");
        setTag("");
        setRestaurante(0);
        alert("Prato cadastrado com sucesso!");
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography component="h1" variant="h6">
          Formulário de Pratos
        </Typography>
        <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
          <TextField
            value={nomePrato}
            onChange={(evento) => setNomePrato(evento.target.value)}
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />
          <TextField
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            label="Descrição do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select
              labelId="select-tag"
              value={tag}
              onChange={(evento) => setTag(evento.target.value)}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select
              labelId="select-restaurante"
              value={restaurante}
              onChange={(evento) => setRestaurante(Number(evento.target.value))}
            >
              {restaurantes.map((restaurante) => (
                <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionarArquivo} />

          <Button
            sx={{ marginTop: 1 }}
            type="submit"
            fullWidth
            variant="outlined"
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormularioPratos;

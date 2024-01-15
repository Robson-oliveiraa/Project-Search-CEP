import { useState } from 'react'
import { BsSearch } from "react-icons/bs";
import './App.css'
import api from './service/api.js';

export default function App() {


  async function randomSearch() {
    // 01310930/json

    if (input === '') {
      alert('Preencha com um CEP!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('')

    } catch {
      alert('Valor invalido, digite novamente')
      setInput('')
    }
  }

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  return (
    <div class="Container">
      <h1 class="Title">Search CEP</h1>
      <div class="ContainerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(event) => setInput(event.target.value)} />
        <button class="ButtonSearch"
          onClick={randomSearch}>
          <BsSearch />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main class="Main">
          <h2>CPE: {cep.cep}</h2>
          <span>Rua: {cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade/UF: {cep.localidade} - {cep.uf}</span>
        </main>
      )}
    </div>
  );
}

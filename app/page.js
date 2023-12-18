'use client';

import styles from '@/styles/page.module.css';
import { useState } from 'react';
import api from '@/services/api';

export default function Home() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert('Insira algum CEP!');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    } catch {
      alert('Erro ao buscar! CEP inexistente');
      setInput('');
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buscar CEP</h1>

      <div className={styles.containerInput}>
        <input
          type='text'
          placeholder='Insira seu CEP'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button className={styles.buttonSearch} onClick={handleSearch}>
          Procurar
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className={styles.main}>
          <h2>CEP: {cep.cep}</h2>
          <p>
            <span>Rua:</span> {cep.logradouro}
          </p>
          <p>
            <span>Complemento:</span> {cep.complemento}
          </p>
          <p>
            <span>Bairro:</span> {cep.bairro}
          </p>
          <p>
            <span>Cidade - UF:</span> {cep.localidade} - {cep.uf}
          </p>
        </main>
      )}
    </div>
  );
}

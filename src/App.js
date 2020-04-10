import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect (() => { 
    getRepositories(); 
  }, []);

  async function getRepositories() {
    try {
      const { data } = await api.get('repositories');
      setRepositories(data);
    } catch (error) {
      console.log('There was a error while fetching the repositories', error.message);
    }
  }

  async function handleAddRepository() {
    try {
      const { data } = await api.post(`repositories`, {
        title: `Repositório de teste | ${new Date().toISOString()}`,
        url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
        techs: ['NodeJS', 'ReactJS', 'React Native']
      });

      setRepositories([...repositories, data]);
    } catch (error) {
      console.log('There was a error while creating the repository', error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const { status } = await api.delete(`repositories/${id}`);
      if (status !== 204) {
        console.log(`There was a error while deleting the repository with id ${id}`);  
      }

      setRepositories(repositories.filter(repository => repository.id !== id));
    } catch (error) {
      console.log(`There was a error while deleting the repository with id ${id}`, error.message);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

const express = require ('express');
const connection = require ('../DB/connection');


const route = express.Router();


route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM manga');
    
    res.status(200).json(result);
  })
  
  route.post('/', async (req, res) => {
    const { nome, tipo, descricao } = req.body;
  
    const [result] = await connection.execute(
      'INSERT INTO teams(nome, tipo, descricao) VALUES(?, ?, ?)', [nome, tipo, descricao] 
    );
  
    const newManga = {
      id: result.insertId,
      nome,
      tipo,
      descricao
    }
  
    res.status(201).json(newManga);
  })
  
  route.put('/:id', async (req, res) => {
    const { nome, tipo, descricao } = req.body;
    const { id } = req.params;
  
    const [[result]] = await connection.execute(`
    SELECT * FROM manga WHERE id = ?`, [id]);
  
    if(!result) {
      res.status(404).json({ message: 'Manga não encontrado'})
    }
  
    const updatedManga = await connection.execute('UPDATE manga SET nome = ?, tipo = ?, descricao = ? WHERE id = ?', [nome, tipo, descricao, id]);
  
    const newManga = {
      id,
      nome,
      tipo,
      descricao
    }
  
    res.status(200).json(newManga);
  })
  
  route.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    const [[result]] = await connection.execute(`
    SELECT * FROM teams WHERE id = ?`, [id]);
  
    if(!result) {
      res.status(404).json({ message: 'Manga não encontrado'})
    }
  
    await connection.execute('DELETE FROM manga WHERE id = ?', [id]);
  
    res.status(204).send();
  })
  
  route.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    const [[result]] = await connection.execute('SELECT * FROM manga WHERE id = ?', [id]);
  
    if(!result) {
      res.status(404).json({ message: 'Manga não encontrado'})
    }
    
    res.status(200).json(result);
  });
  
  module.exports = route;
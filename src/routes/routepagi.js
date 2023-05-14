const express = require ('express');
const connection = require ('../DB/connection');


const route = express.Router();


route.get('/', async (req, res) => {
    const [result] = await connection.execute('SELECT * FROM pagina');
    
    res.status(200).json(result);
  })
  
  route.post('/', async (req, res) => {
    const { npagina, manga, capitulo } = req.body;
  
    const [result] = await connection.execute('INSERT INTO pagina(npagina, manga, capitulo) VALUES(?, ?, ?)', [npagina, manga, capitulo]);
  
    const newPagina = {
      id: result.insertId,
      npagina,
      manga,
      capitulo
    }
  
    res.status(201).json(newPagina);
  })
  
  route.put('/:id', async (req, res) => {
    const { npagina, manga, capitulo } = req.body;
    const { id } = req.params;
  
    const [[result]] = await connection.execute(`SELECT * FROM pagina WHERE id = ?`, [id]);
  
    if(!result) {
      res.status(404).json({ message: 'Pagina do manga não encontrado'})
    }
  
    const updatePagina = await connection.execute('UPDATE pagina SET npagina = ?, manga = ?, capitulo = ? WHERE id = ?', [npagina, manga, capitulo, id]);
  
    const newPagina = {
      id,
      npagina,
      manga,
      capitulo
    }
  
    res.status(200).json(newPagina);
  })
  
  route.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    const [[result]] = await connection.execute('SELECT * FROM pagina WHERE id = ?', [id]);
  
    if(!result) {
      res.status(404).json({ message: 'Pagina do manga não encontrado'})
    }
  
    await connection.execute('DELETE FROM pagina WHERE id = ?', [id]);
  
    res.status(204).send();
  })
  
  route.get('/:id', async (req, res) => {
    const { id } = req.params;
  
    const [[result]] = await connection.execute('SELECT * FROM pagina WHERE id = ?', [id]);
  
    if(!result) {
      res.status(404).json({ message: 'Pagina do manga não encontrado'})
    }
    
    res.status(200).json(result);
  });
  
  module.exports = route;
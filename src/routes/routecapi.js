const express = require ('express');
const connection = require ('../DB/connection');


const route = express.Router();


route.get('/',async (req, res)=>{
    const [result] = await connection.execute('SELECT FROM * capitulo');

    res.status(200).json(result);
    
})

route.post('/', async (req, res)=>{
    
    const {mangaId, nome, ncap}= req.body;

    const [result] = await connection.execute('INSERT TO capitulo(mangaId, nome, ncap) VALUES (?, ?, ?)', [ mangaId, nome, ncap]);
    
    const newCapitulo = {
        id: result.insertId,
        mangaId,
        nome,
        ncap   
    }

    res.status(201).json(newCapitulo);
})

route.put('/:id', async (req, res)=>{
    const { mangaId, nome, ncap} = req.body;
    const {id} = req.params;

    const updatedManga = await connection.execute('UPDATE capitulo SET mangaId = ?, nome = ?, ncap = ? WHERE id = ?',[mangaId, nome, ncap, id]);
   
    const newManga = {
        id,
        mangaId,
        nome,
        ncap
    }
    res.status(200).json(newManga);
})

route.delete('/:id', async (req, res)=>{
    const {id} = req.params;

    await connection.execute('DELETE FROM capitulo WHERE id = ?', [id]);

    res.status(204).send();    
})

route.get('/:id', async (req,res) =>{
    const {id} =req.params;

    const [[result]] = await connection.execute('SELECT FROM * capitulo WHERE id = ?', [id]);

    res.status(200).json(result);
})

module.exports = route;
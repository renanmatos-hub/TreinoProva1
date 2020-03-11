//importando pacote
const express = require('express');
const server = express();

//declarando variável para as tarefas
var tarefas = [
    {
        id: 1,
        descrição: "comprar pão",
        finalizado: false
    }
];

// middlewares:
server.use(express.json());

//criando o insert
server.post('/tarefa', async function(request, response) {
    const tarefa = request.body;
    await tarefas.push(tarefa);
    return response.status(201).send();
})

//criando o read
server.get('/tarefa', async function(request, response) {    
    return response.json(tarefas);
})

//criando o read passando id
server.get('/tarefa/:id', async function(request, response) {
    //puxando o id para fazer o retorno
    const id = request.params.id;
    const retorno = await tarefas.filter(t => t.id == id);    
    return response.json(retorno);
})

//para deletar
server.delete('/tarefa/:id', async function(req, res) {
    //puxando o id
    const id = req.params.id;
    tarefas = await tarefas.filter(f => f.id != id);
    return res.status(200).send();
})

//para update
server.put('/tarefa/:id', async function(req, res){
    const id = req.params.id;
    const tarefa = req.body;

   await tarefas.forEach(t => {
     if(t.id == id) {
        t.descrição = tarefa.descrição;
        t.finalizado = tarefa.finalizado;
        return;
        }
    })

return res.send();
})



















//colocar o servidor para ficar ouvindo a porta 3000
server.listen(process.env.PORT || 3000);
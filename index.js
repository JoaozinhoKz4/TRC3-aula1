import express from 'express';

const server = express();

const users = ["Ayrton", "Andre", "Flavio", "Paulo"];


//Middleware Global
server.use(express.json());

//Middleware Local
function checkId(req, res,next){
    if(!req.body.name) {
    return res
        .status(400)
        .json({ message: " É necessário informar o nome de Usuário"});
    }

    return next();
}

//CRUD
server.get("/users", (req, res) => {
    return res.json(users)
});

server.post("/users", checkId, (req, res) => {
    
    const { name } = req.body;

    users.push(name);

    return res.status(201).json(users);

});

server.put("/users/:id", checkId, (req, res) =>  {

    const { id } = req.params;
    const { name } = req.body;

    users[id] = name;

    return res.json(users);
});

server.delete("/users/:id", (req,res) => {

    const { id } = req.params;
    users.splice(id, 1);
    return res.json({mensagem : "Usuário excluído"});
});


server.listen(8500);
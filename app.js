const express = require ('express')
const app = express()
const PORT = 3000

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
]

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
    res.send (`
        <h1>Lista de usuarios</h1>
        <ul>
        ${usuarios.map((usuario) => 
            `<li>
            ID: ${usuario.id} | Nombre: ${usuario.nombre} | Edad: ${usuario.edad} | Procedencia: ${usuario.lugarProcedencia}
            </li>` )}
        </ul>
        <form action="/usuarios" method="post">

            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required>

            <label for="edad">Edad</label>
            <input type="text" id="edad" name="edad" required>

            <label for="lugarProcedencia">Lugar de procedencia</label>
            <input type="text" id="lugarProcedencia" name="lugarProcedencia" required>

            <button type="submit">Agregar usuario</button>
        </form>

        <p><a href="/usuarios">Usuarios json</a></p>
        `)
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
})

app.post('/usuarios', (req,res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    }
    usuarios.push(nuevoUsuario)
    res.redirect('/')
})

app.get('/usuarios/:nombre', (req, res) => {
    const nombre = req.params.nombre
    const usuario = usuarios.find(usuario => usuario.nombre === nombre)

    if (usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({ error: 'Usuario no encontrado' })
    }
})

app.listen(PORT, () => {
    console.log(`El servidor está escuchando en el puerto http://localhost:${PORT}`)
})
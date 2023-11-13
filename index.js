import dotenv from "dotenv"
import pg from "pg"
import express from "express"
import chalk from "chalk"

let pool = undefined

const start = () => {

    dotenv.config()

    pool = new pg.Pool({
        host: "localhost",
        port: 5432,
        database: "library",
        user: process.env.database_user,
        password: process.env.database_password
    })

    const app = express()
    app.use(express.static("./public/"))
    app.use(express.json())

    app.put("/api/books", createBook)
    app.get("/api/books/:id?", readBooks)
    app.patch("/api/books/:id", updateBook)
    app.delete("/api/books/:id", deleteBook)

    app.get("/api/authors/:id?", readAuthors)

    app.use(sendPageNotFound)

    app.listen(process.env.server_port, () => {
        console.log(chalk.green.bold(`Server started on port ${process.env.server_port}`))
    })
}


const createBook = async (req, res) => {
    const { title, author_id, publication_year } = req.body
    try {
        await pool.query(`insert into books (title, author_id, publication_year) values ('${title}','${author_id}',${publication_year});`)
        res.send("Success.")
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

const readBooks = async (req, res) => {
    const { id } = req.params
    try {
        if (id === undefined) {
            const { rows } = await pool.query(`select * from books;`)
            res.json(rows)
        } else {
            const { rowCount, rows } = await pool.query(`select * from books where id = ${id};`)
            if (rowCount !== 0) {
                res.json(rows)
            } else {
                res.status(500)
                res.json({ message: `No book found with an id of ${id}` })
            }
        }
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

const updateBook = async (req, res) => {
    const { id } = req.params
    const { title, author_id, publication_year } = req.body
    try {

        let sqlQuery = "update books set"

        if (title) {
            sqlQuery += ` title = '${title}'`
        }

        if (author_id) {
            if (title) sqlQuery += ","
            sqlQuery += ` author_id = ${author_id}`
        }

        if (publication_year) {
            if (title || author_id) sqlQuery += ","
            sqlQuery += ` publication_year = ${publication_year}`
        }

        sqlQuery += ` where id = ${id} returning *;`

        const { rowCount, rows } = await pool.query(sqlQuery)
        if (rowCount !== 0) {
            res.json(rows)
        } else {
            res.status(500)
            res.json({ message: `No book found with an id of ${id} ` })
        }
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        const { rowCount, rows } = await pool.query(`delete from books where id = $1 returning *; `, [id])
        if (rowCount !== 0) {
            res.json(rows)
        } else {
            res.status(500)
            res.json({ message: `No book found with an id of ${id} ` })
        }
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

const readAuthors = async (req, res) => {
    const { id } = req.params
    try {
        if (id === undefined) {
            const { rows } = await pool.query(`select * from authors;`)
            res.json(rows)
        } else {
            const { rowCount, rows } = await pool.query(`select * from authors where id = ${id};`)
            if (rowCount !== 0) {
                res.json(rows)
            } else {
                res.status(500)
                res.json({ message: `No author found with an id of ${id}` })
            }
        }
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

const sendPageNotFound = (req, res) => {
    res.redirect("/page-not-found.html")
}

start()
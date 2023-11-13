const table = document.querySelector("table")

const start = () => {

    populateTable()

}

const populateTable = () => {
    fetch(`/api/authors/`)
        .then((res) => {
            return res.json()
        })
        .then((authors) => {
            const authorNames = {}
            for (const author of authors) {
                authorNames[author.id] = author.fullname
            }
            fetch("/api/books")
                .then((res) => {
                    return res.json()
                })
                .then((books) => {
                    books.forEach(book => {
                        addRow(book.id, book.title, authorNames[book.author_id], book.publication_year)
                    })
                })
        })
}

const addRow = (id, title, authorName, publicationYear) => {

    const row = document.createElement("tr")
    table.appendChild(row)

    const idData = document.createElement("td")
    idData.textContent = id
    row.appendChild(idData)

    const titleData = document.createElement("td")
    titleData.textContent = title
    row.appendChild(titleData)

    const authorNameData = document.createElement("td")
    authorNameData.textContent = authorName
    row.appendChild(authorNameData)

    const publicationYearData = document.createElement("td")
    publicationYearData.textContent = publicationYear
    row.appendChild(publicationYearData)
}

start()
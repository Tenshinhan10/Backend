const expressFunct = require('express')
const expressObj = expressFunct()
expressObj.use(expressFunct.json())
const sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "dataBase/dataApi.db"
const cors = require('cors')

expressObj.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))
expressObj.use(cors({
  origin: ['http://localhost:3000/']
}))

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  } else {
    console.log('Connected to the SQLite database.')
  }
})

  // routes
expressObj.get('/api', async function (req, res) {
  let data = []
  db.all("select * from product", [], (err, rows) => {
    if (err) {
      throw err
    }
    rows.forEach((row) => {
      data.push(row)
    })
    res.send(data)
  })
})

const port = process.env.PORT || 5000
expressObj.listen(port, function () {
  console.log(`Listening on port: `, port)
})
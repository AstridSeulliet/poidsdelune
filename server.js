const express = require('express')
const app = express()

app.disable('x-pwerd-by')

app.use(express.static(__dirname + '/public'))
app.set('port', process.env.port || 3000)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

app.listen(app.get('port'), () => {
	console.log('Example app listening on port 3000!')
})

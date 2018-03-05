const express = require('express')
const app = express()
const bodyParser = require('body-parser');

// configure bodyparser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('x-powered-by')
app.use(express.static(__dirname + '/public'))
app.set('port', process.env.port || 3000)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

app.get('/grid', (req, res) => {
	res.sendFile(__dirname + '/views/grid.html');
})

app.listen(app.get('port'), () => {
	console.log('Example app listening on port 3000!')
})


const router = express.Router()

// MIDDLEWARE
router.use((req, res, next) => {
	const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	console.log("Remote:", ip)
	next();
})

// API
app.use('/api', router);

router.get('/', (req, res) => {
	res.json({ message: 'welcome to our API!' })
})

router.route('/:body/:mass')
	.get((req, res) => {
		/*
			Pesanteur sur la Terre : 9,81 N/kg
			Pesanteur sur la Lune : 1,57 N/kg
			Vous pesez (masse) 75 kg soit (75 x 9,81) 735,75 N sur Terre et (75 x 1,57) 117,75 N sur la Lune
			Vous pesez donc environ (735,75 / 117,75) 6,25 fois moins sur la Lune
			Une balance apportée sur la Lune vous donnerait donc un poids d'environ (75 / 6,25) 12 kg
			Méthode plus directe : (Masse x Pesanteur Astre) / Pesanteur Terre
		*/

		const GFList = { // Gravitational field
			mercury: 3.8, // N/kg
			venus: 8.8, // N/kg
			earth: 9.8, // N/kg
			mars: 3.8, // N/kg
			jupiter: 25.0, // N/kg
			saturn: 10.4, // N/kg
			uranus: 10.4, // N/kg
			neptun: 13.8, // N/kg
			moon: 1.57 // N/kg
		}

		const body = req.params.body
		const bodyGF = GFList[body] // N/kg

		if (typeof bodyGF === "undefined") {
			res.json({
				error: "error"
			})
		} else {
			const mass = parseInt(req.params.mass) // kg
			const earthGF = GFList["earth"] // N/kg
			const pseudomass = (mass * bodyGF) / earthGF // kg
			const weight = mass * bodyGF // N

			res.json({
				result: {
					source: {
						body: "earth",
						mass,
						weight: mass * earthGF,
						gravitational_field: earthGF
					},
					target: {
						body,
						mass,
						weight,
						gravitational_field: bodyGF,
						pseudomass
					}
				}
			})
		}
	})

import express from 'express'

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(express.json())


// app.get('/api/token', async(req, res) => {
// 	console.log(req)
// })

app.get('/api/token', async(req, res) => {
    const response = await fetchAndRetry('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			grant_type: 'authorization_code',
			code: req.body.code,
		}),
	});

	const { access_token } = (await response.json())
	res.send({ access_token });
})


app.listen(port, () => {
    console.log(`Running on port: ${port}`)
})

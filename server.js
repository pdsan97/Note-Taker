const express = require('express');
const database = require('./database');
const uuid = require('uuid');
const path = require('path');

const app = express();
app.use(
	express.static(path.join(__dirname, '/public'), {
		index: 'index.html',
		extensions: ['html'],
	})
);
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Listening to ${PORT}`);
});

app.get('/api/notes', (req, res) => {
	res.send(database.getNotes());
});

app.post('/api/notes', (req, res) => {
	const { title, text } = req.body;
	const note = {
		title: title,
		text: text,
		id: uuid.v4(),
	};
	database.addNote(note);
	res.sendStatus(200);
});

app.post('/api/notes', (req, res) => {
	const { title, text } = req.body;
	const note = {
		title: title,
		text: text,
		id: uuid.v4(),
	};
	database.addNote(note);
	res.send(note);
});

app.delete('/api/notes/:id', (req, res) => {
	const { id } = req.params;
	if (id) {
		database.deleteNote(id);
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
});
app.get('/*', (req, res) => {
	res.redirect('/');
});

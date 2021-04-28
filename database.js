const fs = require('fs');
const path = require('path');

class Database {
	constructor(dbPathName) {
		this.dbPathName = dbPathName;
		this.init();
	}

	setNotes(notes) {
		this.notes = notes;
	}

	getNotes() {
		return this.notes;
	}

	deleteNote(id) {
		const notes = this.getNotes().filter(note => note.id !== id);
		this.setNotes(notes);
		this.saveNotes();
	}

	addNote(note) {
		const notes = [...this.getNotes(), note];
		this.setNotes(notes);
		this.saveNotes();
	}

	saveNotes() {
		fs.writeFile(
			path.join(__dirname, this.dbPathName),
			JSON.stringify(this.getNotes(), null, 4),
			err => {
				if (err) {
					console.log(err);
				}
			}
		);
	}

	init() {
		fs.readFile(
			path.join(__dirname, this.dbPathName),
			'utf-8',
			(err, data) => {
				if (err) console.log(err);
				const notes = JSON.parse(data);
				this.setNotes(notes);
			}
		);
	}
}

const database = new Database('./db.json');

module.exports = database;

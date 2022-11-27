const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
    const notes = await getNotes();
    const note = {
        title,
        id: Date.now().toString(),
    };

    notes.push(note);

    await saveNotes(notes);
    console.log(chalk.bgGreen("Note was added!"));
}

async function removeNotes(id) {
    const notes = await getNotes();
    const filteredNotes = notes.filter((note) => {
        return note.id !== id;
    });
    console.log("FILTERED", filteredNotes);
    console.log("notes", notes);
    //notes.push(filteredNotes);

    await saveNotes(filteredNotes);
    console.log(chalk.bgGreen("Note was deleted!"));
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlue("Here is the list of notes:"));
    notes.forEach((note) => {
        console.log(chalk.greenBright(note.id), chalk.blue(note.title));
    });
}

module.exports = {
    addNote,
    printNotes,
    removeNotes,
};

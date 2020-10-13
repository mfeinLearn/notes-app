class Notes {
    constructor() {
        this.notes = []
        this.adapter = new NotesAdapter()
        this.initBindingsAndEventListeners() // I dont want to cache the dom every single time
        this.fetchAndLoadNotes()
    }

    initBindingsAndEventListeners() {
        // so you wont need to grab that dom elememt every time you render
        this.notesContainer = document.getElementById('notes-container')
        this.newNoteBody = document.getElementById('new-note-body')
        this.noteForm = document.getElementById('new-note-form')
        this.noteForm.addEventListener('submit', this.createNote.bind(this))
    }

    createNote(e) {
        e.preventDefault();
        const value = this.newNoteBody.value

        this.adapter.createNote(value).then(note => {
            this.notes.push(new Note(note))
            this.newNoteBody.value = ''
            this.render()
        })
    }

    fetchAndLoadNotes() {
        this.adapter.getNotes().then(notes => {
            notes.forEach(note => this.notes.push(new Note(note)))
            console.log(this.notes)
        })
        .then(() => {
            this.render()
        })
    }

    render() {
        // maping over each indivisual note
        this.notesContainer.innerHTML = this.notes.map(note => note.renderLi()).join('')
    }

}

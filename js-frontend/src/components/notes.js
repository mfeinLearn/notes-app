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
        this.notesContainer.addEventListener('dblclick', this.handleNoteClick.bind(this))
        this.notesContainer.addEventListener('blur', this.updateNote.bind(this), true)
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

    handleNoteClick(e) {
        this.toggleNote(e)
    }
    toggleNote(e) {
        const li = e.target
        li.contentEditable = true;
        li.focus()
        li.classList.add('editable')
    }

    updateNote(e) {
        const li = e.target
        li.contentEditable = false;
        li.classList.remove('editable')
        const newValue = li.innerHTML
        const id = li.dataset.id
        console.log(id)
        this.adapter.updateNote(newValue, id)
    }

    fetchAndLoadNotes() {
        this.adapter.getNotes().then(notes => {
            notes.sort((a, b) => a.id - b.id).forEach(note => this.notes.push(new Note(note)))
            //console.log(this.notes)
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

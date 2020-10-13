// talk to our backend API
//Job of this -> communicate with the api
// Note: could of called this NotesService

class NotesAdapter {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/v1/notes'
    }

    getNotes() {
        return fetch(this.baseUrl).then(res => res.json()
        )
    }

    createNote(value) {
        const note = {
            body: value
        }
        return fetch(this.baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note })

        }).then(res => res.json())
    }
}



// future plans with adapter is to do the following:
// adapter = new NotesAdapter()
// const notes = adapter.getNotes()

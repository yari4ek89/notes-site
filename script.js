// ver 0.1 LOGIC: when user clicks button "Add note"
// Caption and description validation
// Then create new element in notes div with caption and description and edit and delete buttons
// ver 0.2 LOGIC: when user searches note and notes counter
// Search bar validation
// When searched highlight note or go to that note
// Every note count

const addNote = document.querySelector('.add-note');
const notesContainer = document.querySelector('.notes');
const captionInput = document.querySelector('.caption-input');
const descriptionInput = document.querySelector('.description-input');
const searchInput = document.querySelector('.search-input');
const counterNote = document.querySelector('.notes-counter');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Validate search bar
function searchValidation() {
    if (searchInput.value === '') {
        return alert('Please fill out the search bar');
    } else {
        searchNote();
    }
}

// Validate all inputs
function formValidation() {
    if (captionInput.value === '' || descriptionInput.value === '') {
        return alert('Please fill out the fields');
    } else {
        addNewNote();
    }
}

// Render notes from local storage
function renderNotes() {
    notesContainer.innerHTML = '';

    notes.forEach((note, index) => {
        // Create a new note
        const noteEl = document.createElement('div');
        noteEl.classList.add('note');

        // Create a caption
        const captionEl = document.createElement('input');
        captionEl.value = note.caption;
        captionEl.type = 'text';
        captionEl.disabled = true;

        // Create a description
        const descriptionEl = document.createElement('textarea');
        descriptionEl.value = note.description;
        descriptionEl.type = 'text';
        descriptionEl.disabled = true;
        descriptionEl.style.resize = 'none';

        // Create an Edit button
        const editNoteEl = document.createElement('button');
        editNoteEl.textContent = 'EDIT';
        editNoteEl.classList.add('edit-button');
        editNoteEl.addEventListener('click', () => editNote(index, captionEl, descriptionEl));

        // Create a Delete button
        const deleteNoteEl = document.createElement('button');
        deleteNoteEl.textContent = 'DELETE';
        deleteNoteEl.classList.add('delete-button');
        deleteNoteEl.addEventListener('click', () => deleteNote(index));

        // Add child
        noteEl.appendChild(captionEl);
        noteEl.appendChild(descriptionEl);
        noteEl.appendChild(editNoteEl);
        noteEl.appendChild(deleteNoteEl);

        notesContainer.appendChild(noteEl);
    });

    // Notes counter
    counterNote.textContent = 'Notes counter: ' + notes.length;
}

// Add a new note
function addNewNote() {
    // Trimming
    const caption = captionInput.value.trim();
    const description = descriptionInput.value.trim();

    // Notes saving and rendering
    notes.push({ caption: caption, description: description });
    saveNotes();
    renderNotes();

    // Resetting inputs
    captionInput.value = '';
    descriptionInput.value = 'Enter the description...';
}

// Delete a note
function deleteNote(index) {
    // Delete note at index then save notes and render
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

// Edit a note
function editNote(index, captionEl, descriptionEl) {
    // Disable or enable note
    captionEl.disabled = !captionEl.disabled;
    descriptionEl.disabled = !descriptionEl.disabled;

    // Check if enabled
    if (captionEl.disabled && descriptionEl.disabled) {
        if (captionEl.value === '' || descriptionEl.value === '') {
            alert('Please fill out the fields');
        } else {
            notes[index].caption = captionEl.value;
            notes[index].description = descriptionEl.value;
            saveNotes();
            renderNotes();
        }
    }
}

// Search a note
function searchNote() {
    // Trimming values
    const searchTarget = searchInput.value.trim().toLowerCase();

    // Render new
    renderNotes();

    // Check notes
    notes.forEach((note, index) => {
        if(note.caption === searchTarget) {
            document.querySelectorAll('.note').forEach((noteEl) => {
                noteEl.querySelectorAll('input').forEach(input => {
                    if (input.value.trim().toLowerCase() === searchTarget) {
                        noteEl.scrollIntoView();
                        input.classList.add('input-found');
                        searchInput.value = '';
                    }
                });
            });
        }
    });
}

// Save all notes in local storage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Listeners
addNote.addEventListener('click', e => {
    e.preventDefault();
    formValidation();
});
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchNote();
});

// Render notes
renderNotes();
// Load notes from local storage
document.addEventListener("DOMContentLoaded", loadNotes);

// Event listener for adding a note
document.getElementById("addNoteBtn").addEventListener("click", addNote);

// Function to add a new note
function addNote() {
    var noteInput = document.getElementById("noteInput").value.trim();
    if (noteInput !== "") {
        var noteList = document.getElementById("noteList");
        var noteItem = document.createElement("div");
        noteItem.classList.add("note-item");
        noteItem.innerHTML = `
            <div class="note-content">${noteInput}</div>
            <div class="note-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        noteList.appendChild(noteItem);
        saveNotes();
        document.getElementById("noteInput").value = ""; // Clear input field
    } else {
        alert("Please enter a note!");
    }
}

// Function to save notes to local storage
function saveNotes() {
    var notes = document.querySelectorAll(".note-item .note-content");
    var notesArray = [];
    notes.forEach(note => {
        notesArray.push(note.textContent);
    });
    localStorage.setItem("notes", JSON.stringify(notesArray));
}

// Function to load notes from local storage
function loadNotes() {
    var notes = localStorage.getItem("notes");
    if (notes) {
        var notesArray = JSON.parse(notes);
        var noteList = document.getElementById("noteList");
        notesArray.forEach(noteText => {
            var noteItem = document.createElement("div");
            noteItem.classList.add("note-item");
            noteItem.innerHTML = `
                <div class="note-content">${noteText}</div>
                <div class="note-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            noteList.appendChild(noteItem);
        });
    }
}

// for edit and delete buttons
document.getElementById("noteList").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        event.target.parentElement.parentElement.remove();
        saveNotes();
    } else if (event.target.classList.contains("edit-btn")) {
        var contentElement = event.target.parentElement.previousElementSibling;
        var newContent = prompt("Edit your note:", contentElement.textContent);
        if (newContent !== null && newContent.trim() !== "") {
            contentElement.textContent = newContent.trim();
            saveNotes();
        }
    }
});

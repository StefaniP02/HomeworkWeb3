// Проверка за логнат потребител
const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
  window.location.href = '/views/login/login.html';
}

// Примерни бележки
const sampleNotes = [
  { title: "Shopping List", content: "Milk, Bread, Eggs" },
  { title: "Homework", content: "Finish WEB project" },
  { title: "Study Plan", content: "Monday: Web, APIS Tuesday: UX" }
];

// Зареждане на бележките
const notesContainer = document.getElementById('notes-container');
sampleNotes.forEach(note => {
  const noteCard = document.createElement('div');
  noteCard.classList.add('note-card');
  noteCard.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.content}</p>
  `;
  notesContainer.appendChild(noteCard);
});

// Logout логика
document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('loggedInUser');
  window.location.href = '/views/login/login.html';
});

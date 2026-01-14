console.log("hello world...");

function showTitle() {
  const title = document.getElementById("title");
  title.style.display = "block";
}

document.addEventListener("click", (e) => {
  const notebox = document.getElementById("noteContainer");
  const searchInput = document.getElementById("searchInput")
  if (!notebox.contains(e.target) && !searchInput.contains(e.target)) {
    saveNotes();
  }
});

async function saveNotes() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  console.log("title is : ", title);
  console.log("content is : ", content);
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    window.location.href = "/";
  } catch (error) {
    console.error("Failed to create notes", error);
  }
}

async function removeNotes(btn) {
  const noteId = btn.dataset.id;

  const res = await fetch(`/${noteId}`, {
    method: "DELETE",
  });

  const data = await res.json();
  window.location.reload();
}

async function updateNotes(btn) {
  const noteId = btn.dataset.id;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const newTitle = prompt("update title", title);
  const newContent = prompt("update content", content);

  const res = await fetch(`/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newTitle, newContent }),
  });
  const data = await res.json();
  window.location.reload();
}

let searchTimeout;

function searchNotes() {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    const searchInput = document.getElementById("searchInput").value;
    const res = await fetch(`/search?q=${encodeURIComponent(searchInput)}`);
    const data = await res.json();
    displaySearch(data.notes);
  }, 300);
}

function displaySearch(notes) {
  const noteBox = document.getElementById("noteBox");
  if (notes.length === 0) {
    noteBox.innerHTML = "<p>No notes found</p>";
    return
  }

  noteBox.innerHTML = notes.map(note => `
      <div class="shadow p-4 rounded-md">
      <h1 class="font-bold text-xl">${note.title || " "}</h1>
      <p>${note.content || " "}</p>
    </div>
    `);
}

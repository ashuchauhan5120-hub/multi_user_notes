console.log("Hello World...");

async function removeNotesByAdmin(btn) {
  const id = btn.dataset.id;

  const res = await fetch(`/${id}`, {
    method: "DELETE",
  });

  if (!res.ok){
    return alert("Failed to delete")
  }

  window.location.reload()
}

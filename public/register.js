console.log("Hello world...");

async function registerUser(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return alert("All fields are required");
    }

    window.location.href = "/login"
  } catch (error) {
    alert("Network error. Please try again");
  }
}

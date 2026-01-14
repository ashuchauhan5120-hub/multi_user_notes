console.log("Hello world...")

async function loginTheUser(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return alert("Failed to log in. Please try again");
    }

    window.location.href = "/";
  } catch (error) {
    console.error("Login Failed", error);
    alert("Network error. Please try again");
  }
}

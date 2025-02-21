document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector("button[type='submit']");
    const emailInput = document.querySelector(".user-input");
    const passwordInput = document.querySelector(".pass-input");
    const togglePassword = document.getElementById("togglePassword");

    // 👁 Password show/hide toggle
    togglePassword.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "🙈";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "👁";
        }
    });

    // ✅ Login Button Click Event
    loginButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Form submit hone se roka

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            alert("Please fill all fields!");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                alert("Login Successful!");
                localStorage.setItem("token", data.token); // Token store kiya
                window.location.href = "dashboard.html"; // Redirect
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Try again!");
        }
    });
});

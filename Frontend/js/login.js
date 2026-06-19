const apiUrl = "http://localhost:5145/api/Account/login";

async function login() {

    const loginData = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    try {

        const response = await fetch(apiUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(loginData)

        });

        if (!response.ok) {

            alert("Invalid Email or Password");
            return;
        }

        const user = await response.json();

        localStorage.setItem("userId", user.userId);
        localStorage.setItem("role", user.role);
        localStorage.setItem("userName", user.name);
        localStorage.setItem(
            "email",
            user.email
        );
        alert("Login Successful");

        if (user.role.toLowerCase() === "admin") {

            window.location.href = "admin.html";

        } else {

            window.location.href = "events.html";
        }

    }
    catch (error) {

        console.error(error);

        alert("Login Failed");
    }
}
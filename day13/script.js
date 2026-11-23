
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const strengthIndicator = document.getElementById("strengthIndicator");
const strengthMessage = document.getElementById("strengthMessage");
const matchMessage = document.getElementById("matchMessage");
const resetButton = document.getElementById("resetButton");

const requirements = {
    length: document.getElementById("length"),
    uppercase: document.getElementById("uppercase"),
    lowercase: document.getElementById("lowercase"),
    number: document.getElementById("number"),
    special: document.getElementById("special")
};

function checkPassword() {
    const value = password.value;

    const checks = {
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[^A-Za-z0-9]/.test(value)
    };

    let score = 0;

    for (let key in checks) {
        if (checks[key]) {
            score++;
            requirements[key].textContent =
                "✓ " + requirements[key].textContent.substring(2);
            requirements[key].classList.add("valid");
        } else {
            requirements[key].textContent =
                "✗ " + requirements[key].textContent.substring(2);
            requirements[key].classList.remove("valid");
        }
    }

    if (value.length === 0) {
        strengthIndicator.style.width = "0%";
        strengthIndicator.style.backgroundColor = "transparent";
        strengthMessage.textContent = "Please enter a password.";
        strengthMessage.style.color = "#777";
        return;
    }

    if (score <= 2) {
        strengthIndicator.style.width = "33%";
        strengthIndicator.style.backgroundColor = "#dc3545";
        strengthMessage.textContent = "Weak Password";
        strengthMessage.style.color = "#dc3545";
    } else if (score <= 4) {
        strengthIndicator.style.width = "66%";
        strengthIndicator.style.backgroundColor = "#ffc107";
        strengthMessage.textContent = "Medium Password";
        strengthMessage.style.color = "#d39e00";
    } else {
        strengthIndicator.style.width = "100%";
        strengthIndicator.style.backgroundColor = "#28a745";
        strengthMessage.textContent = "Strong Password";
        strengthMessage.style.color = "#28a745";
    }
}

function checkMatch() {
    if (confirmPassword.value.length === 0) {
        matchMessage.textContent = "";
        return;
    }

    if (password.value === confirmPassword.value) {
        matchMessage.textContent = "✓ Passwords Match";
        matchMessage.style.color = "green";
    } else {
        matchMessage.textContent = "✗ Passwords Do Not Match";
        matchMessage.style.color = "red";
    }
}

password.addEventListener("input", function() {
    checkPassword();
    checkMatch();
});

confirmPassword.addEventListener("input", checkMatch);

togglePassword.addEventListener("click", function() {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }
});

resetButton.addEventListener("click", function() {
    password.value = "";
    confirmPassword.value = "";

    password.type = "password";
    togglePassword.textContent = "Show";

    checkPassword();
    checkMatch();
});

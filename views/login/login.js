const logInForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passInput = document.getElementById('password');

logInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passInput.value.trim();

    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const user = JSON.parse(storedUser);

        if (user.password === password) {

            // Запазване на емейла на логнатия юзър в localStorage
            localStorage.setItem('loggedInUser', username);

            // Препраща към login
            window.location.href = "/views/dashboard/dashboard.html";
        } else {
            alert("Incorrect password!");
            return;
        }
    } else {
        alert("User with this username doesn't exist!");
        return;
    }
});

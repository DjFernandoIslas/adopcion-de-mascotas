document.addEventListener('DOMContentLoaded', function() {
    var loginTrigger = document.getElementById('loginTrigger');
    var loginPopup = document.getElementById('loginPopup');
    var loginForm = document.getElementById('loginForm');
    var registerForm = document.getElementById('registerForm');
    var showLoginForm = document.getElementById('showLoginForm');
    var showRegisterForm = document.getElementById('showRegisterForm');
    var loginTitle = document.getElementById('loginTitle');
    var registerTitle = document.getElementById('registerTitle');

    // Mostrar el popup con el formulario de inicio de sesión
    loginTrigger.addEventListener('click', function() {
        registerForm.style.display = 'none';
        loginForm.style.display = 'flex';
        registerTitle.style.display = 'none';
        loginTitle.style.display = 'block';
        loginPopup.classList.add('visible');
    });

    // Cambiar al formulario de registro
    showRegisterForm.addEventListener('click', function() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        loginTitle.style.display = 'none';
        registerTitle.style.display = 'block';
    });

    // Cambiar al formulario de inicio de sesión
    showLoginForm.addEventListener('click', function() {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        registerTitle.style.display = 'none';
        loginTitle.style.display = 'block';
    });

    // Cerrar el popup al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (!loginPopup.contains(event.target) && event.target !== loginTrigger) {
            loginPopup.classList.remove('visible');
        }
    });
});

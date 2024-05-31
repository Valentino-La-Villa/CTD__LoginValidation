document.addEventListener('DOMContentLoaded', ()=>{

    const loginForm = document.getElementById('loginForm')
    const emailInput = document.getElementById('email')
    const passwordInput = document.getElementById('password')
    const confirmPasswordInput = document.getElementById('confirmPassword')
    const emailError = document.getElementById('emailError')
    const passwordError = document.getElementById('passwordError')
    const confirmPasswordError = document.getElementById('confirmPasswordError')
    const togglePasswordVisibilityButton = document.getElementById('toggleVisibility') 


    loginForm.addEventListener('submit', ($event)=>{
        $event.preventDefault()
        validateForm()
    })

    emailInput.addEventListener('blur', ()=>{
        validateEmail()
    })

    emailInput.addEventListener('change', ()=>{
        clearError(emailError)
    })




    passwordInput.addEventListener('blur', ()=>{
        validatePassword()
    })

    passwordInput.addEventListener('change', ()=>{
        clearError(passwordError)
    })




    confirmPasswordInput.addEventListener('blur', ()=>{
        validatePasswordMatch()
    })

    confirmPasswordInput.addEventListener('change', ()=>{
        clearError(confirmPasswordError)
    })


    togglePasswordVisibilityButton.addEventListener('click', ()=>{
        if (passwordInput.type == 'password') {
            passwordInput.type = 'text'
            confirmPasswordInput.type = 'text'
        } else {
            passwordInput.type = 'password'
            confirmPasswordInput.type = 'password'
        }
    })


    function showError(errorElement, message) {
        errorElement.innerHTML = message
        errorElement.style.display = 'block'
    }

    function clearError(errorElement) {
        errorElement.innerHTML = ''
        errorElement.style.display = 'none'
    }

    function validateForm() {
        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()
        const doPasswordsMatch = validatePasswordMatch()

        if (isEmailValid && isPasswordValid && doPasswordsMatch) {
            saveToLocalStorage()
            alert('Has ingresado la información de manera exitosa')
        } else return false
    }

    function validateEmail() {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            showError(emailError, 'Ingrese un email válido')
            return false
        } else return true
    }

    function validatePassword() {
        if (passwordInput.value.trim().length < 6) {
            showError(passwordError, 'La contraseña debe tener al menos 6 caracteres')
            return false
        } else return true
    }

    function validatePasswordMatch() {
        if (confirmPasswordInput.value != passwordInput.value) {
            showError(confirmPasswordError, 'Las contraseñas provistas no son iguales')
            return false
        } else return true
    }

    function saveToLocalStorage() {
        const emailValue = emailInput.value.trim()
        localStorage.setItem('email', emailValue)

        const body = JSONBodyBuilder()
        console.log(body)
        // TODO: Hacer un JSON
    }

    function JSONBodyBuilder() {
        return {
            'email': emailInput.value,
            'password': passwordInput.value,
        }
    }
})
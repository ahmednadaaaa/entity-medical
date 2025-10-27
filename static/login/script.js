// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginFormElement = document.getElementById('login');
const registerFormElement = document.getElementById('register');

// Form switching functions
function showLogin() {
    loginForm.classList.remove('hidden');
    registerForm.classList.add('hidden');
    clearMessages();
    clearForm(loginFormElement);
}

function showRegister() {
    registerForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    clearMessages();
    clearForm(registerFormElement);
}

// Clear form function
function clearForm(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('error');
    });
}

// Clear messages function
function clearMessages() {
    const messages = document.querySelectorAll('.success-message, .error-message');
    messages.forEach(message => message.remove());
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Phone number validation
function validatePhone(phone) {
    const phoneRegex = /^(\+20|0)?1[0-9]{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Password validation
function validatePassword(password) {
    return password.length >= 6;
}

// Email validation
function validateEmail(email) {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(message) {
    clearMessages();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const formWrapper = document.querySelector('.form-wrapper:not(.hidden)');
    formWrapper.insertBefore(errorDiv, formWrapper.querySelector('.form'));
}

// Show success message
function showSuccess(message) {
    clearMessages();
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const formWrapper = document.querySelector('.form-wrapper:not(.hidden)');
    formWrapper.insertBefore(successDiv, formWrapper.querySelector('.form'));
}

// Add error styling to input
function addErrorStyling(input) {
    input.classList.add('error');
    input.style.borderColor = '#dc3545';
    input.style.backgroundColor = '#fff5f5';
}

// Remove error styling from input
function removeErrorStyling(input) {
    input.classList.remove('error');
    input.style.borderColor = '#e8f4f8';
    input.style.backgroundColor = '#fafbfc';
}

// Validate form inputs
function validateFormInputs(formType) {
    let isValid = true;
    const errors = [];

    if (formType === 'login') {
        const phone = document.getElementById('loginPhone');
        const password = document.getElementById('loginPassword');

        // Validate phone
        if (!phone.value.trim()) {
            errors.push('رقم التليفون مطلوب');
            addErrorStyling(phone);
        } else if (!validatePhone(phone.value)) {
            errors.push('رقم التليفون غير صحيح');
            addErrorStyling(phone);
        } else {
            removeErrorStyling(phone);
        }

        // Validate password
        if (!password.value.trim()) {
            errors.push('كلمة المرور مطلوبة');
            addErrorStyling(password);
        } else if (!validatePassword(password.value)) {
            errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            addErrorStyling(password);
        } else {
            removeErrorStyling(password);
        }

    } else if (formType === 'register') {
        const name = document.getElementById('registerName');
        const phone = document.getElementById('registerPhone');
        const email = document.getElementById('registerEmail');
        const password = document.getElementById('registerPassword');
        const confirmPassword = document.getElementById('confirmPassword');
        const agreeTerms = document.getElementById('agreeTerms');

        // Validate name
        if (!name.value.trim()) {
            errors.push('الاسم الكامل مطلوب');
            addErrorStyling(name);
        } else {
            removeErrorStyling(name);
        }

        // Validate phone
        if (!phone.value.trim()) {
            errors.push('رقم التليفون مطلوب');
            addErrorStyling(phone);
        } else if (!validatePhone(phone.value)) {
            errors.push('رقم التليفون غير صحيح');
            addErrorStyling(phone);
        } else {
            removeErrorStyling(phone);
        }

        // Validate email (optional)
        if (email.value && !validateEmail(email.value)) {
            errors.push('البريد الإلكتروني غير صحيح');
            addErrorStyling(email);
        } else {
            removeErrorStyling(email);
        }

        // Validate password
        if (!password.value.trim()) {
            errors.push('كلمة المرور مطلوبة');
            addErrorStyling(password);
        } else if (!validatePassword(password.value)) {
            errors.push('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            addErrorStyling(password);
        } else {
            removeErrorStyling(password);
        }

        // Validate confirm password
        if (!confirmPassword.value.trim()) {
            errors.push('تأكيد كلمة المرور مطلوب');
            addErrorStyling(confirmPassword);
        } else if (password.value !== confirmPassword.value) {
            errors.push('كلمة المرور وتأكيدها غير متطابقين');
            addErrorStyling(confirmPassword);
        } else {
            removeErrorStyling(confirmPassword);
        }

        // Validate terms agreement
        if (!agreeTerms.checked) {
            errors.push('يجب الموافقة على الشروط والأحكام');
        }
    }

    if (errors.length > 0) {
        showError(errors.join(' - '));
        isValid = false;
    }

    return isValid;
}

// Simulate login process
function simulateLogin(phone, password, rememberMe) {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // Simulate successful login (in real app, this would be an API call)
            if (phone === '01234567890' && password === '123456') {
                resolve({
                    success: true,
                    message: 'تم تسجيل الدخول بنجاح',
                    user: {
                        name: 'مستخدم تجريبي',
                        phone: phone
                    }
                });
            } else {
                reject({
                    success: false,
                    message: 'رقم التليفون أو كلمة المرور غير صحيحة'
                });
            }
        }, 1500);
    });
}

// Simulate registration process
function simulateRegister(userData) {
    return new Promise((resolve, reject) => {
        // Simulate API call delay
        setTimeout(() => {
            // Simulate successful registration (in real app, this would be an API call)
            resolve({
                success: true,
                message: 'تم إنشاء الحساب بنجاح',
                user: userData
            });
        }, 2000);
    });
}

// Handle login form submission
loginFormElement.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const phone = document.getElementById('loginPhone').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate form
    if (!validateFormInputs('login')) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'جاري تسجيل الدخول...';
    
    try {
        const result = await simulateLogin(phone, password, rememberMe);
        
        if (result.success) {
            showSuccess(result.message);
            
            // Store user data if remember me is checked
            if (rememberMe) {
                localStorage.setItem('userData', JSON.stringify(result.user));
            }
            
            // Redirect to dashboard (simulate)
            setTimeout(() => {
                alert('سيتم توجيهك إلى لوحة التحكم...');
                // window.location.href = 'dashboard.html';
            }, 2000);
        }
    } catch (error) {
        showError(error.message);
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
    }
});

// Handle register form submission
registerFormElement.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const phone = document.getElementById('registerPhone').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Validate form
    if (!validateFormInputs('register')) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'جاري إنشاء الحساب...';
    
    try {
        const userData = {
            name: name,
            phone: phone,
            email: email || null,
            password: password
        };
        
        const result = await simulateRegister(userData);
        
        if (result.success) {
            showSuccess(result.message);
            
            // Clear form
            clearForm(this);
            
            // Switch to login form after successful registration
            setTimeout(() => {
                showLogin();
                // Pre-fill phone number
                document.getElementById('loginPhone').value = phone;
            }, 2000);
        }
    } catch (error) {
        showError(error.message);
    } finally {
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
    }
});

// Real-time validation for phone numbers
document.addEventListener('input', function(e) {
    if (e.target.type === 'tel') {
        // Format phone number as user types
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('20')) {
            value = value.substring(2);
        }
        if (value.startsWith('0')) {
            value = value.substring(1);
        }
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        // Add formatting
        if (value.length > 0) {
            if (value.length <= 3) {
                e.target.value = value;
            } else if (value.length <= 6) {
                e.target.value = value.substring(0, 3) + ' ' + value.substring(3);
            } else if (value.length <= 8) {
                e.target.value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
            } else {
                e.target.value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 8) + ' ' + value.substring(8);
            }
        }
    }
});

// Clear error styling when user starts typing
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('error')) {
        removeErrorStyling(e.target);
    }
});

// Check for saved user data on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        document.getElementById('loginPhone').value = userData.phone;
        document.getElementById('rememberMe').checked = true;
    }
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
        const form = e.target.closest('form');
        if (form) {
            const submitBtn = form.querySelector('.btn-primary');
            if (submitBtn && !submitBtn.classList.contains('loading')) {
                submitBtn.click();
            }
        }
    }
});

// Add focus management for better accessibility
function manageFocus() {
    const visibleForm = document.querySelector('.form-container:not(.hidden)');
    const firstInput = visibleForm.querySelector('input');
    if (firstInput) {
        firstInput.focus();
    }
}

// Call focus management when switching forms
const originalShowLogin = showLogin;
const originalShowRegister = showRegister;

showLogin = function() {
    originalShowLogin();
    setTimeout(manageFocus, 100);
};

showRegister = function() {
    originalShowRegister();
    setTimeout(manageFocus, 100);
};

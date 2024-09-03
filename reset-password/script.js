$(document).ready(function () {
    const strengthBar = $('#passwordStrengthBar');
    const matchMessage = $('#passwordMatchMessage');

    function checkPasswordStrength(password) {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[\W]/.test(password)) strength += 1;

        switch (strength) {
            case 0:
                strengthBar.css('width', '0%').removeClass().addClass('progress-bar');
                break;
            case 1:
                strengthBar.css('width', '20%').removeClass().addClass('progress-bar bg-danger');
                break;
            case 2:
                strengthBar.css('width', '40%').removeClass().addClass('progress-bar bg-warning');
                break;
            case 3:
                strengthBar.css('width', '60%').removeClass().addClass('progress-bar bg-info');
                break;
            case 4:
                strengthBar.css('width', '80%').removeClass().addClass('progress-bar bg-primary');
                break;
            case 5:
                strengthBar.css('width', '100%').removeClass().addClass('progress-bar bg-success');
                break;
        }
    }

    $('#newPassword').on('input', function () {
        const password = $(this).val();
        checkPasswordStrength(password);
    });

    $('#confirmPassword').on('input', function () {
        const password = $('#newPassword').val();
        const confirmPassword = $(this).val();

        if (password === confirmPassword) {
            matchMessage.text('Passwords match').removeClass('text-danger').addClass('text-success');
        } else {
            matchMessage.text('Passwords do not match').removeClass('text-success').addClass('text-danger');
        }
    });

    $('#passwordResetForm').on('submit', function (e) {
        e.preventDefault();

        const password = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        if (password !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        alert('You Have Successfully Reset The Password!');
        $(this)[0].reset();
        strengthBar.css('width', '0%').removeClass().addClass('progress-bar');
        matchMessage.text('');
    });
});

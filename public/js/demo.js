//$(function() {
var emailFormat = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

$('#name').focusout(checkName);
$('#email').focusout(checkEmail);
$('#btn-apply').click(checkForm);

function checkName() {
    $("#feedback-name").addClass('d-none');

    if ($("#name").val().length === 0) {
        $("#feedback-name").removeClass('d-none');
        return true;
    } else {
        return false;
    }
}

function checkEmail() {
    $("#feedback-email-empty").addClass('d-none');
    $("#feedback-email-invalid").addClass('d-none');

    if ($("#email").val().length === 0) {
        $("#feedback-email-empty").removeClass('d-none');
        return true;
    } else if (!emailFormat.test($("#email").val())) {
        $("#feedback-email-invalid").removeClass('d-none');
        return true;
    } else {
        return false;
    }
}

function checkForm() {
    $('#apply-invalid').addClass('d-none');
    $('#apply-error').addClass('d-none');
    $('#apply-success').addClass('d-none');

    if (checkName() === false && checkEmail() === false) {
        submit();
    } else {
        $('#apply-invalid').removeClass('d-none');
    }
}

function submit() {
    $.ajax({
            method: 'POST',
            url: 'http://avanade.gama.academy/api/process_applications',
            dataType: 'json',
            headers: { EMAIL: $('#name').val() },
            contentType: 'application/json',
            data: JSON.stringify({ process_application: { name: $('#name').val(), email: $('#email').val() } }),
        })
        .done(function() {
            $('#apply-success').removeClass('d-none');
        })
        .fail(function() {
            $('#apply-error').removeClass('d-none');
        })
}
//})
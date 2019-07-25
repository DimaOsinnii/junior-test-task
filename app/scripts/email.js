/* SmtpJS.com - v3.0.0 */
var Email = {
    send: function (a) {
        return new Promise(function (n, e) {
            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
            var t = JSON.stringify(a);
            Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
                n(e)
            })
        })
    }, ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () {
            var e = a.responseText;
            null != t && t(e)
        }, a.send(n)
    }, ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e);
        t.onload = function () {
            var e = t.responseText;
            null != n && n(e)
        }, t.send()
    }, createCORSRequest: function (e, n) {
        var t = new XMLHttpRequest;
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
    }
};
var email = document.getElementById('mail');
var buttonSubmit = document.getElementById("submit");
var messageResult = document.querySelector('.email-message');
var sendResult = '';

var yourToken = '840b2860-a6e0-4d8d-9608-a5c76a140b9b'; // enter token to br able to send emails
var emailToSendFrom = 'd.osinnii@gmail.com';
var emailSubject = "Test site";
var emailContent = "Привіт, це перевірка тестового завдання, яке зробив Osinnii Dmytro";


buttonSubmit.addEventListener('click', function (e) {
    if (email.checkValidity()) {
        sendEmail();
        e.preventDefault();
    }
});

function sendEmail() {
    Email.send({
        SecureToken: yourToken,
        To: email.value,
        From: emailToSendFrom,
        Subject: emailSubject,
        Body: emailContent
    })
        .then(function (message) {
                sendResult = 'Email successfully sent';
                messageResult.innerHTML = ('<p>' + sendResult + '</p>');
                messageResult.classList.add('email-active');
                setTimeout(function () {
                    messageResult.classList.remove('email-active');
                }, 2000);
                email.value = '';
        })
        .catch(function (e) {
            console.log(e);
        })
}
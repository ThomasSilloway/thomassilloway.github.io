function convertFormToJSON(form) {
var array = $(form).serializeArray();
var json = {};
$.each(array, function () {
    json[this.name] = this.value || "";
});
return json;
}

$('#email-form').each(function (
i,
el
) {
var form = $(el);
form.submit(function (e) {
    e.preventDefault();

    var request_url = "https://maker.ifttt.com/trigger/email_form/with/key/juU6Hiz3TA3u9DGHH0fjicOfZ9EpdVzPREW7VElIIcX";

    var request_data = {
        value1 : "test7",
        value2 : "test8",
        value3 : "test9"
    };

    $.post(request_url, request_data).done(function( data ) {
        var parent = $(form.parent());
        // Hide the form
        parent.children("form").css("display", "none");
        // Display the "Done" block
        parent.children(".w-form-done").css("display", "block");
    }).fail(function() {
        var parent = $(form.parent());
        // Display the "Failed" block
        parent.find(".w-form-fail").css("display", "block");
    });
});
});

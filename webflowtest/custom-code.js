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

    var request_url = "https://hook.us1.make.com/r9cdtqyxifkvsd9fzeybbau5mijyy1wb";

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

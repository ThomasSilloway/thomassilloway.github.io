//var deployment = "test";
var deployment = "prod";

function is_test()
{
    return deployment == "test";
}

function displaySuccess(parent)
{
    // Hide the form
    parent.children("form").css("display", "none");
    // Display the "Done" block
    parent.children(".w-form-done").css("display", "block");
}

$('#email-form').each(function (
i,
el
) {
var form = $(el);
form.submit(function (e) {
    e.preventDefault();

    form = $(e.target);

    if(is_test())
    {
        displaySuccess(form.parent());
        return;
    }    

    var request_url = "https://hook.us1.make.com/r9cdtqyxifkvsd9fzeybbau5mijyy1wb";

    var request_data = form.serializeArray();

    $.post(request_url, request_data).done(function( data ) {
        displaySuccess($(form.parent()));
    }).fail(function() {
        var parent = $(form.parent());
        // Display the "Failed" block
        parent.find(".w-form-fail").css("display", "block");
    });
});
});

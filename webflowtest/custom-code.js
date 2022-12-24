function is_test()
{
    return Config.deployment == "test";
}

function animateFormSubmit()
{
    $('#form-suck-in-anim').click();

    setTimeout(function() {
        displaySuccess()
      }, 1000);
}

function displaySuccess()
{
    var parent = $('#email-form').parent();
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
        animateFormSubmit();
        return;
    }    

    var request_url = "https://hook.us1.make.com/r9cdtqyxifkvsd9fzeybbau5mijyy1wb";

    var request_data = form.serializeArray();

    $.post(request_url, request_data).done(function( data ) {
        animateFormSubmit();
    }).fail(function() {
        var parent = $(form.parent());
        // Display the "Failed" block
        parent.find(".w-form-fail").css("display", "block");
    });
});
});

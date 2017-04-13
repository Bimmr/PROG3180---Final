/**
 * Created by Randy, Derek on 04/8/17.
 */

function doValidate_frmSearchBook() {
    var form = $("#frmSearchBook");
    form.validate({
        rules: {
            txtTitle: {
                lengthCheck: true,
                maxlength: 25
            },
            txtAuthor: {
                lengthCheck: true,
                maxlegnth: 25
            }
        }
    });

    jQuery.validator.addMethod("lengthCheck",
        function (value, element) {

            var valid = true;

            if (value != null && value.length <= 2) {
                valid = false
            }
            return valid;
        },
        "Please enter a title with more than 2 characters."
    );

}



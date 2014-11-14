define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {
        var viewModel = kendo.observable({
            firstEmail: null,
            secondEmail: null,
            isPrimitive: false,
            displayFirstEmail: function() {
                var firstEmail = this.get("firstEmail");
                return kendo.stringify(firstEmail, null, 4);
            },
            displaySecondEmail: function() {
                var secondEmail = this.get("secondEmail");
                return kendo.stringify(secondEmail, null, 4);
            },
            sendEmail: function() {
                if (validator.validate()) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/communications",
                    data: {
                        email_to: this.displayFirstEmail(),
                        email_cc: this.displaySecondEmail(),
                        subject: $("#subject").val(),
                        message: $("#message").val(),
                        status: 1,
                        created_by: 78789
                    },
                    dataType: "json",
                    statusCode: {
                        201: function(data, textStatus) {
                            window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                        }
                    }
                });
                } else {
                    status.text("Please ensure all required fields are filled in.");
                }
            },

            employees: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: function (data) {
                            var url = window.location.href.split("/");
                            return "http://localhost/ingot3/web/app_dev.php/api/v1/parties/" + url[8] + "/contacts"
                        }
                    }
                }
            })
        });
        kendo.bind($(".container"), viewModel);
        var validator = $(".form-emailParty").kendoValidator().data("kendoValidator"),
            status = $(".status");
    })
});
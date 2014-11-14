define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/communications"
                }
            }
        });

        var listView = $("#shipment-messages-listview").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#messages").html())
        }).data("kendoListView");

        var validator = $("#form-addMessage").kendoValidator().data("kendoValidator"),
            status = $(".status");

        $("#sendButton").click( function()
        {
            if (validator.validate()) {
            $.ajax({
                type: "POST",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/communications",
                data: {
                    email_to: 'system',
                    email_cc: null,
                    subject: $("#subject").val(),
                    message: $("#message").val(),
                    created_by: 78789
                },
                dataType: "json",
                statusCode: {
                    201: function(data, textStatus) {
                        window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/communication";
                    }
                }
            });
            } else {
                status.text("Please ensure all required fields are filled in.");
            }
        });
    });
});
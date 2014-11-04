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
            template: kendo.template($("#template").html())
        }).data("kendoListView");


    });

});
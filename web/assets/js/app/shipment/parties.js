define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {




        $(document).on('click','#email',function(){
            console.log($(this));
        });

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties"
                }
            }
        });

        var listView = $("#shipment-parties-listview").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html())
        }).data("kendoListView");


    });

});
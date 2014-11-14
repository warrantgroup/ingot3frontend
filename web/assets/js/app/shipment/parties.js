define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {

        $(document).on('click','#email',function(){
            window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/party/" + $(this).attr("name") + "/email";
        });

        $(document).on('click','#editParty',function(){
            window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/party/" + $(this).attr("name") + "/edit";
        });

        $(document).on('click','#deleteParty',function(){
            $.ajax({
                type: "DELETE",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties/" + $(this).attr("name"),
                dataType: "json",
                success : function() {
                    window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                }
            });
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
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
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/parties/" + $(this).attr("name"),
                dataType: "json",
                success : function() {
                    window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                }
            });
        });

        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/parties"
                }
            }
        });

        var parties = [
            {
                "id": "1",
                "party": {
                    "name": "Test Company",
                    "address": {
                        "address1": "Building Name",
                        "address2": "Address Line",
                        "address3": "Locality",
                        "address4": "Region",
                        "post_code": "Post Code",
                        "country": {
                            "id": "gb",
                            "name": "United Kingdom"
                        }
                    }
                }
            },
            {
                "id": "2",
                "party": {
                    "name": "Test Shipper",
                    "address": {
                        "address1": "Building Name",
                        "address2": "Address Line",
                        "address3": "Locality",
                        "address4": "Region",
                        "post_code": "Post Code",
                        "country": {
                            "id": "de",
                            "name": "Germany"
                        }
                    }
                }
            },
            {
                "id": "3",
                "party": {
                    "name": "Test Consignee",
                    "address": {
                        "address1": "Building Name",
                        "address2": "Address Line",
                        "address3": "Locality",
                        "address4": "Region",
                        "post_code": "Post Code",
                        "country": {
                            "id": "fr",
                            "name": "France"
                        }
                    }
                }
            },
            {
                "id": "4",
                "party": {
                    "name": "Test Notify",
                    "address": {
                        "address1": "Building Name",
                        "address2": "Address Line",
                        "address3": "Locality",
                        "address4": "Region",
                        "post_code": "Post Code",
                        "country": {
                            "id": "it",
                            "name": "Italy"
                        }
                    }
                }
            }
        ];

        var dataSource = new kendo.data.DataSource({
            data: parties
        });

        var listView = $("#shipment-parties-listview").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html())
        }).data("kendoListView");
    });
});
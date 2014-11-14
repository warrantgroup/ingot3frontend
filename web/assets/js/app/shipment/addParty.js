define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {

        var viewModel = kendo.observable({
            locationListener: function (e) {
                var dataItem = $("#location").data("kendoAutoComplete").dataItem(e.item.index());
                window.locationId = dataItem.id;
                window.countryId = dataItem.countryId;
            },

            partyListener: function (e) {
                var dataItem = $("#party").data("kendoAutoComplete").dataItem(e.item.index());
                window.partyId = dataItem.id;
            },

            location: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/location",
                        data: {
                            query: function(){
                                return $("#location").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),

            party: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/parties",
                        data: {
                            query: function(){
                                return $("#party").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            })
        });

        kendo.bind($(".container"), viewModel);

        var findPartyValidator = $("#form-findParty").kendoValidator().data("kendoValidator"),
            findPartyStatus = $(".findPartyStatus"),
            addPartyValidator = $("#form-newParty").kendoValidator().data("kendoValidator"),
            addPartyStatus = $(".addPartyStatus");

        $("location").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true,
            valueField: "id"
        });

        $("party").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true,
            valueField: "id"
        });

        $("#find").click( function()
        {
            if (findPartyValidator.validate()) {
            var url = window.location.href.split("/");
            $.ajax({
                type: "POST",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties",
                data: {
                    partyId: window.partyId,
                    partyType: url[8]
                },
                dataType: "json",
                statusCode: {
                    201: function(data, textStatus) {
                        window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                    }
                }
            });
            } else {
                findPartyStatus.text("Please ensure all required fields are filled in.");
            }
        });

        $("#submit").click( function()
        {
            if (addPartyValidator.validate()) {
            var url = window.location.href.split("/");
            $.ajax({
                type: "POST",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties",
                data: {
                    name: $("#name").val(),
                    phone: $("#phone").val(),
                    fax: $("#fax").val(),
                    website: $("#website").val(),
                    vat_no: $("#vatNo").val(),
                    registration_no: $("#regNo").val(),
                    note: $("#note").val(),
                    address: {
                        address1: $("#address1").val(),
                        address2: $("#address2").val(),
                        address3: $("#address3").val(),
                        address4: $("#address4").val(),
                        post_code: $("#postcode").val(),
                        location: window.locationId,
                        country: window.countryId
                    },
                    partyType: url[8]
                },
                dataType: "json",
                statusCode: {
                    201: function(data, textStatus) {
                        window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                    }
                }
            });
            } else {
                addPartyStatus.text("Please ensure all required fields are filled in.");
            }
        });
    });
});
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
            }),

            partyTypeData: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/partytype"
                }
            })
        });

        kendo.bind($(".container"), viewModel);

        var changePartyValidator = $("#form-changeParty").kendoValidator().data("kendoValidator"),
            changePartyStatus = $(".changePartyStatus"),
            changePartyTypeValidator = $("#form-changePartyType").kendoValidator().data("kendoValidator"),
            changePartyTypeStatus = $(".changePartyTypeStatus"),
            editPartyValidator = $("#form-editParty").kendoValidator().data("kendoValidator"),
            editPartyStatus = $(".editPartyStatus");

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

        $("#form-editParty").ready( function()
        {
            var url = window.location.href.split("/");
            $.ajax({
                type: "GET",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties/" + url[8],
                statusCode: {
                    200: function(data, textStatus) {
                        $("#name").val(data.party.name);
                        $("#partyType").data("kendoDropDownList").select(function(dataItem) {
                            return dataItem.id === data.party_type.id;
                        });
                        $("#phone").val(data.party.phone);
                        $("#fax").val(data.party.fax);
                        $("#website").val(data.party.website);
                        $("#vatNo").val(data.party.vat_no);
                        $("#regNo").val(data.party.registration_no);
                        $("#note").val(data.party.note);
                        $("#address1").val(data.party.address.address1);
                        $("#address2").val(data.party.address.address2);
                        $("#address3").val(data.party.address.address3);
                        $("#address4").val(data.party.address.address4);
                        $("#postcode").val(data.party.address.post_code);
                        $("#location").val(data.party.address.location.name);
                        $("#country").val(data.party.address.country.name);
                        window.partyId = data.party.id;
                        window.partyTypeId = data.party_type.id;
                        window.locationId = data.party.address.location.id;
                        window.countryId = data.party.address.country.id;
                    }
                }
            });
        });

        $("#submit").click( function()
        {
            if (editPartyValidator.validate()) {
            var url = window.location.href.split("/");
            $.ajax({
                type: "PUT",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties/" + url[8],
                data: {
                    party: {
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
                        }
                    },
                    partyType: $("#partyType").val()
                },
                dataType: "json",
                statusCode: {
                    201: function(data, textStatus) {
                        window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                    }
                }
            });
            } else {
                editPartyStatus.text("Please ensure all required fields are filled in.");
            }
        });

        $("#changePartyType").click( function()
        {
            if (changePartyTypeValidator.validate()) {
            var url = window.location.href.split("/");
            $.ajax({
                type: "PATCH",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties/" + url[8],
                data: {
                    partyType: $("#partyType").val(),
                    partyId: window.partyId
                },
                dataType: "json",
                statusCode: {
                    200: function(data, textStatus) {
                        window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                    }
                }
            });
            } else {
                changePartyTypeStatus.text("Please ensure all required fields are filled in.");
            }
        });

        $("#changeParty").click( function()
        {
            if (changePartyValidator.validate()) {
            var url = window.location.href.split("/");
            $.ajax({
                type: "PATCH",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/shipmentparties/" + url[8],
                data: {
                    partyId: window.partyId,
                    partyType: window.partyTypeId
                },
                dataType: "json",
                statusCode: {
                    200: function(data, textStatus) {
                        window.location.href = "http://localhost/ingot3frontend/web/shipment/IFT00001/parties";
                    }
                }
            });
            } else {
                changePartyStatus.text("Please ensure all required fields are filled in.");
            }
        });
    });
});
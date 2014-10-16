define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {

        var parties = [
            {
                "partyType": "Shipper",
                "partyName": "Test Company",
                "partyAddress1": "Building Name",
                "partyAddress2": "Address Line",
                "partyAddress3": "Locality",
                "partyAddress4": "Region",
                "partyPostCode": "Post Code",
                "partyCountryCode": 'gb',
                "partyCountry": 'United Kingdom'
            },
            {
                "partyType": "Consignee",
                "partyName": "Test Consignee",
                "partyAddress1": "Building Name",
                "partyAddress2": "Address Line",
                "partyAddress3": "Locality",
                "partyAddress4": "Region",
                "partyPostCode": "Post Code",
                "partyCountryCode": 'de',
                "partyCountry": 'Germany'
            },
            {
                "partyType": "Notify Party",
                "partyName": "Test Notify Party",
                "partyAddress1": "Building Name",
                "partyAddress2": "Address Line",
                "partyAddress3": "Locality",
                "partyAddress4": "Region",
                "partyPostCode": "Post Code",
                "partyCountryCode": 'fr',
                "partyCountry": 'France'
            },
            {
                "partyType": "Notify Party",
                "partyName": "Test Notify Party",
                "partyAddress1": "Building Name",
                "partyAddress2": "Address Line",
                "partyAddress3": "Locality",
                "partyAddress4": "Region",
                "partyPostCode": "Post Code",
                "partyCountryCode": 'fr',
                "partyCountry": 'France'
            },
            {
                "partyType": "Notify Party",
                "partyName": "Test Notify Party",
                "partyAddress1": "Building Name",
                "partyAddress2": "Address Line",
                "partyAddress3": "Locality",
                "partyAddress4": "Region",
                "partyPostCode": "Post Code",
                "partyCountryCode": 'fr',
                "partyCountry": 'France'
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
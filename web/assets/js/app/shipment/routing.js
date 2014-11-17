define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {

        var parties = [
            {
                "routingType": "Pickup",
                "modeType": "road",
                "from": "Liverpool, United Kingdom",
                "fromAddress": "",
                "fromCountryCode": "GB",
                "fromType": "port",
                "to": "Southampton, United Kingdom",
                "toAddress": "",
                "toCountryCode": "GB",
                "toType": "port",
                "eta": "01-11-2014",
                "etd": "01-11-2014",
                "carrier": "Goldstar Transport",
                "carrierRef": ""
            },
            {
                "routingType": "Main Carriage",
                "modeType": "sea",
                "fromCountryCode": "GB",
                "fromType": "port",
                "from": "Southampton, United Kingdom",
                "fromAddress": "",
                "toCountryCode": "CN",
                "toType": "port",
                "to": "Ningbo, China",
                "toAddress": "",
                "eta": "01-11-2014",
                "etd": "12-11-2014",
                "carrier": "Maersk Line",
                "carrierRef": "XW98CKW93NVSA"
            },
            {
                "routingType": "Delivery",
                "modeType": "road",
                "from": "Ningbo, China",
                "fromAddress": "",
                "fromCountryCode": "CN",
                "fromType": "port",
                "to": "Century Point Group Ltd",
                "toAddress" : "218 Huangshan West Road, Beilunda Gang, Industrial Zone, Ningbo, Japan",
                "toCountryCode": "CN",
                "toType": "company",
                "eta": "2014-11-01",
                "etd": "2014-11-01",
                "carrier": "",
                "carrierRef": ""
            }
        ];

        var dataSource = new kendo.data.DataSource({
            data: parties
        });

        var listView = $("#shipment-routing-listview").kendoListView({
            dataSource: dataSource,
            template: kendo.template($("#template").html())
        }).data("kendoListView");

    });

});
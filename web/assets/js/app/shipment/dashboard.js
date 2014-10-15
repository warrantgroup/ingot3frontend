define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    var shipments = [
        {
            "modeType": "Sea",
            "tradeType": "Export",
            "forwarderRef": "IFT00001",
            "customer": "B&M Retail Ltd",
            "containerMode": "FCL House",
            "routing": "GBSOU > CNNGB",
            "eta": '20/09/2014',
            "etd": '01/09/2014',
            "status": "Arrived"
        }
    ];

    var dataSource = new kendo.data.DataSource({
        data: shipments
    });

    $("#shipment-grid").kendoGrid({
        dataSource: dataSource,
        height: $(document).height() - 200,
        groupable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
            field: "modeType",
            title: "Mode",
            width: 60
        }, {
            field: "tradeType",
            title: "Trade",
            width: 80
        }, {
            field: "containerMode",
            title: "Type",
            width: 80
        }, {
            field: "customer",
            title: "Customer",
            width: 150
        }, {
            field: "routing",
            title: "Routing",
            width: 100
        }, {
            field: "forwarderRef",
            title: "HWB",
            width: 100
        }, {
            field: "masterRef",
            title: "Master",
            width: 100
        }, {
            field: "etd",
            title: "ETD",
            width: 70
        }, {
            field: "eta",
            title: "ETA",
            width: 70
        }, {
            field: "status",
            title: "Status",
            width: 100
        }]
    });
});
define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    var references = [
        {
            "referenceType": "PO Reference",
            "reference": "A726HA71-01"
        }
    ];

    var dataSource = new kendo.data.DataSource({
        data: references
    });

    $("#shipment-reference-grid").kendoGrid({
        dataSource: dataSource,
        groupable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
            field: "referenceType",
            title: "Type",
            width: 200

        }, {
            field: "reference",
            title: "Reference"
        }],
        dataBound: function()
        {
            $('#shipment-reference-grid .k-grid-content').height(400);
        }
    });

    var dates = [
        {
            "dateType": "Cargo Ready Date",
            "reference": "17-12-2014"
        }
    ];

    var dataSource = new kendo.data.DataSource({
        data: dates
    });

    $("#shipment-date-grid").kendoGrid({
        dataSource: dataSource,
        groupable: false,
        sortable: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
            field: "dateType",
            title: "Type",
            width: 200

        }, {
            field: "reference",
            title: "Reference"
        }],
        dataBound: function()
        {
            $('#shipment-date-grid .k-grid-content').height(400);
        }
    });
});
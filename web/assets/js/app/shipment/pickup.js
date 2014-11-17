define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    var locations = [
        {
            "locationName": "Depot One",
            "locationAddress": "157 Regent Road, Liverpool, l5 9TF",
            "containerTotal" : 10,
            "grossWeight": 23000,
            "carrierBookingRef": 'ZN028MLS9219MX'
        }
    ];

    var dataSource = new kendo.data.DataSource({
        data: locations,
        schema:{
            model: {
                fields: {
                    locationName: { type: "string" },
                    locationAddress: { type: "string" },
                    containerTotal: { type: "number" },
                    grossWeight: { type: "number" },
                    carrierBookingRef: { type: "string" }
                }
            }
        },
        aggregate: [
            { field: "locationName", aggregate: "count" },
            { field: "containerTotal", aggregate: "sum" },
            { field: "grossWeight", aggregate: "sum", format: "{0:n}" }
        ]
    });

    var containerDataSource = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/containers"
            },
            create: {
                type: "POST",
                url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/containers",
                complete: function(e) {
                    $('#shipment-containers-grid').data('kendoGrid').dataSource.read();
                    $('#shipment-containers-grid').data('kendoGrid').refresh();
                }
            },
            update: {
                type: "PUT",
                url: function (data) {
                    return "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/containers/" + data.models[0].id;
                },
                complete: function(e) {
                    $('#shipment-containers-grid').data('kendoGrid').dataSource.read();
                    $('#shipment-containers-grid').data('kendoGrid').refresh();
                }
            },
            destroy: {
                type: "DELETE",
                url: function (data) {
                    return "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/containers/" + data.models[0].id;
                },
                complete: function(e) {
                    $('#shipment-containers-grid').data('kendoGrid').dataSource.read();
                    $('#shipment-containers-grid').data('kendoGrid').refresh();
                }
            },
            parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                    return {models: kendo.stringify(options.models)};
                }
            }
        },
        batch: true,
        schema: {
            model: {
                id: "id",
                fields: {
                    container_no: { type: "text" },
                    container_type: {}
                }
            }
        }
    });


    var grid = $("#pickup-grid").kendoGrid({
        dataSource: dataSource,
        columns: [
            { field: "locationName", title: "Location", width: "400px", template: '<h5>#: locationName#</h5><p>#: locationAddress#</p>', footerTemplate: "Total: #=count#" },
            { field: "containerTotal", title: "No. Containers", footerTemplate: "#=sum# Containers" },
            { field: "grossWeight", title: "Gross Weight (kg)", format: "{0:n}", footerTemplate: "#= kendo.toString(sum, 'n') # kg"},
            { field: "carrierBookingRef", title: "Carrier Booking Ref"},
            { command: { text: "Edit", click: showDetails }, title: " ", width: "140px" }
        ]
    }).data("kendoGrid");

    detailWindow = $("#pickup-detail")
        .kendoWindow({
            actions: ["Refresh", "Maximize", "Close"],
            title: "Edit Pickup",
            modal: true,
            visible: false,
            resizable: true,
            width: 800,
            height: 800,
            open: onOpenWindow
        }).data("kendoWindow");

    detailTemplate = kendo.template($("#template").html());

    $("#shipment-pickup-add")
        .bind("click", function() {
            detailWindow.title('Add Pickup');
            detailWindow.content(detailTemplate);
            detailWindow.center().open();
        });

    function onOpenWindow(e) {

        $("#pickup-detail-tabstrip").kendoTabStrip({
            height: 800
        });

        $('#carrierBookingRef').tagsinput({
            allowDuplicates: false
        });

        $("#pickup-container-grid").kendoGrid({
            dataSource: containerDataSource,
            sortable: true,
            columns: [
                { field: 'container_no', title: 'Container Number' },
                { field: 'container_type', title: 'Container Type', template: "#=container_type.name#" },
                { field: 'load_date', title: 'Load Date', format:"{0:dd-MM-yyyy HH:mm}", editor: dateTimeEditor },
                { command: ["destroy"], title: "&nbsp;", width: "200px" }
            ],
            editable: true
        });
    }

    function dateTimeEditor(container, options) {
        $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
            .appendTo(container)
            .kendoDateTimePicker({});
    }

    function showDetails(e) {
        e.preventDefault();

        detailWindow.title('Edit Pickup');

        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        detailWindow.content(detailTemplate(dataItem));
        detailWindow.center().open();
    }
});
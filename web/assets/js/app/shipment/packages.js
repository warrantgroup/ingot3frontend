define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {

        var packageDataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/packages"
                },
                create: {
                    type: "POST",
                    url: function (data) {
                        return "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/packages/" + data.models[0].container;
                    },
                    complete: function(e) {
                        $('#shipment-packages-grid').data('kendoGrid').dataSource.read();
                        $('#shipment-packages-grid').data('kendoGrid').refresh();
                    }
                },
                update: {
                    type: "PATCH",
                    url: function (data) {
                        return "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/packages/" + data.models[0].id;
                    },
                    complete: function(e) {
                        $('#shipment-packages-grid').data('kendoGrid').dataSource.read();
                        $('#shipment-packages-grid').data('kendoGrid').refresh();
                    }
                },
                destroy: {
                    type: "DELETE",
                    url: function (data) {
                        return "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/packages/" + data.models[0].id;
                    },
                    complete: function(e) {
                        $('#shipment-packages-grid').data('kendoGrid').dataSource.read();
                        $('#shipment-packages-grid').data('kendoGrid').refresh();
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
                        total: { type: "number" },
                        gross_weight: { type: "decimal" },
                        net_weight: { type: "decimal" },
                        cube: { type: "number" },
                        sku_ref: { type: "text" },
                        description: { type: "text" },
                        mark_number: { type: "text" },
                        length: { type: "number" },
                        height: { type: "number" },
                        width: { type: "number" },
                        package_type_name: {},
                        container_no: {}
                    }
                }
            }
        });

        var grid = $("#shipment-packages-grid").kendoGrid({
            dataSource: packageDataSource,
            sortable: true,
            toolbar: ["create"],
            columns: [
                { field: "total", title:"Total Packages" },
                { field: "gross_weight", title:"Gross Weight" },
                { field: "net_weight", title:"Net Weight" },
                { field: "cube", title: "Cube" },
                { field: "sku_ref", title: "Sku Reference" },
                { field: "description", title: "Description" },
                { field: "mark_number", title: "Mark Number" },
                { field: "length", title: "Length" },
                { field: "height", title: "Height" },
                { field: "width", title: "Width" },
                { field: 'package_type', title: 'Package Type', editor: packageTypeEditor, template: "#=package_type_name#" },
                { field: 'container', title: 'Container', editor: containerEditor, template: "#=container_no#" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "200px" }
            ],
            editable: "inline"
        });

        function containerEditor(container, options) {
            $('<input required data-text-field="container_no" data-value-primitive="true" data-value-field="id" id="containerEditor" data-filter="startsWith" data-minLength="3" data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataSource: {
                        serverFiltering: true,
                        transport: {
                            read: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/containers"
                        }
                    }
                });
            $("#containerEditor").data("kendoDropDownList").list.width(400);
        }

        function packageTypeEditor(container, options) {
            $('<input required data-text-field="name" data-value-primitive="true" data-value-field="id" id="packageType" data-filter="startsWith" data-minLength="3" data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataSource: {
                        serverFiltering: true,
                        transport: {
                            read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/packagetype"
                        }
                    }
                });

            $("#packageType").data("kendoDropDownList").list.width(400);
        }
    });
});
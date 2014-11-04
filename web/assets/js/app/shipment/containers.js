define(['jquery', 'domReady!', 'kendo'], function ($, doc, kendo) {

    $(doc).ready(function() {

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
                        seal_no: { type: "text" },
                        gross_weight: { type: "decimal" },
                        net_weight: { type: "decimal" },
                        reference: { type: "text" },
                        ticket_ref: { type: "text" },
                        package_total: { type: "number" },
                        is_hazardous: { type: "boolean" },
                        container_type: {}
                    }
                }
            }
        });

        var container = $("#shipment-containers-grid").kendoGrid({
            dataSource: containerDataSource,
            sortable: true,
            detailInit: detailInit,
            toolbar: ["create"],
            columns: [
                { field: 'container_no', title: 'Container Number' },
                { field: 'seal_no', title: 'Seal Number' },
                { field: 'gross_weight', title: 'Gross Weight' },
                { field: 'net_weight', title: 'Net Weight' },
                { field: 'reference', title: 'Reference' },
                { field: 'ticket_ref', title: 'Ticket Ref' },
                { field: 'package_total', title: 'Package Total' },
                { field: 'is_hazardous', title: 'Hazardous' },
                { field: 'container_type', title: 'Container Type', editor: containerTypeEditor, template: "#=container_type.name#" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "200px" }
            ],
            editable: "inline"
        });

        function containerTypeEditor(container, options) {
            $('<input required data-text-field="name" data-value-primitive="true" data-value-field="id" id="containerType" data-filter="startsWith" data-minLength="3" data-bind="value:' + options.field + '"/>')
                .appendTo(container)
                .kendoDropDownList({
                    dataSource: {
                        serverFiltering: true,
                        transport: {
                            read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/containertype"
                        }
                    }
                });

            $("#containerType").data("kendoDropDownList").list.width(400);
        }

        function detailInit(e) {
            window.packageDataSource = new kendo.data.DataSource({
                transport: {
                    read: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/containers/" + e.data.id + "/packages"
                }
            });
            var packageRec = $("<div/>").appendTo(e.detailCell).kendoGrid({
                dataSource: window.packageDataSource,
                scrollable: false,
                sortable: true,
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
                    { field: "width", title: "Width" }
                ]
            });

            packageRec.kendoDraggable({
                filter: "tbody tr",
                group: "gridGroup",
                hint: function(e) {
                    return $('<div class="k-grid k-widget"><table><tbody><tr>' + e.html() + '</tr></tbody></table></div>');
                }
            });
        }

        var selectedClass = 'k-state-selected';
        $(document).on('click','#grid tbody tr',function(e) {
            if (e.ctrlKey || e.metaKey) {
                $(this).toggleClass(selectedClass);
            } else {
                $(this).addClass(selectedClass).siblings().removeClass(selectedClass);
            }
        });

        container.kendoDropTarget({
            filter: "td",
            group: "gridGroup",
            drop: function(e) {
                var draggedRows = e.draggable.hint.find("tr");
                e.draggable.hint.hide();
                var dropLocation = $(document.elementFromPoint(e.clientX, e.clientY)),
                    containerRecord = containerDataSource.getByUid(dropLocation.parent().attr("data-uid")),
                    packageRecord = window.packageDataSource.getByUid((e.draggable.currentTarget).data("uid"));

                if(dropLocation.is("th")) {
                    return;
                }

                var params = {};
                params['container'] = containerRecord.id;

                if (packageRecord.id != undefined){
                    $.ajax({
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/shipments/IFT00001/packages/" + packageRecord.id,
                        type : 'PATCH',
                        data : params,
                        success : function() {
                            $('#shipment-containers-grid').data('kendoGrid').dataSource.read();
                            $('#shipment-containers-grid').data('kendoGrid').refresh();
                        }
                    });
                }
            }, scope: this
        }, this);
    });
});
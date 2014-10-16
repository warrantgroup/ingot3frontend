define(['jquery', 'domReady!', 'kendo', 'blockui'], function ($, doc, kendo, blockui) {

    $(document).ready(function () {

        var viewModel = kendo.observable({

            etdListener: function (e) {
                var date = e.sender._value;
                $("#eta").kendoDatePicker({
                    min: new Date(date.getFullYear(), date.getMonth(), date.getDate())
                });
            },

            etaListener: function (e) {
                var date = e.sender._value;
                $("#etd").kendoDatePicker({
                    max: new Date(date.getFullYear(), date.getMonth(), date.getDate())
                });
            },

            atdListener: function (e) {
                var date = e.sender._value;
                $("#ata").kendoDatePicker({
                    min: new Date(date.getFullYear(), date.getMonth(), date.getDate())
                });
            },

            ataListener: function (e) {
                var date = e.sender._value;
                $("#atd").kendoDatePicker({
                    max: new Date(date.getFullYear(), date.getMonth(), date.getDate())
                });
            },

            movementType: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/movementtype",
                        data: {
                            query: function(){
                                return $("#movementType").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            incoterm: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/incoterm",
                        data: {
                            query: function(){
                                return $("#incoterm").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            portLoading: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/location",
                        data: {
                            query: function(){
                                return $("#portLoading").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            portDischarge: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/location",
                        data: {
                            query: function(){
                                return $("#portDischarge").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            carrier: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/carrier",
                        data: {
                            query: function(){
                                return $("#carrier").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            vessel: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/vessel",
                        data: {
                            query: function(){
                                return $("#vessel").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            freightPcData: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/pcdata"
                }
            }),
            otherPcData: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/pcdata"
                }
            })
        });

        kendo.bind($(".tab-content"), viewModel);

        $(".tab-content").kendoValidator().data("kendoValidator");

        $("#movementType").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true
        });

        $("#incoterm").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true
        });

        $("#portLoading").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true
        });

        $("#portDischarge").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true
        });

        $("#carrier").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true
        });

        $("#vessel").kendoAutoComplete({
            filter: "startswith",
            highlightFirst: true
        });

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
});
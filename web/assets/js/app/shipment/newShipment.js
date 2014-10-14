define(['jquery', 'domReady!', 'kendo', 'blockui'], function ($, doc, kendo, blockui) {

    $(document).ready(function () {

        //$('#shipment-form').block({message: null, fadeIn: 0, fadeOut: 0});

        var viewModel = kendo.observable({

            tradeType: null,
            shipmentMode: null,
            containerMode: null,
            shipmentType: null,

            listener: function (e) {
                this.processForm(e);
            },
            shipmentModeListener: function(e) {
                this.updateContainerMode(this.get('shipmentMode'));
                this.processForm(e);
            },
            tradeTypeListener: function(e) {
                this.updateShipperRequired(this.get('tradeType'));
                this.processForm(e);
            },
            tradeTypeData: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/tradetype"
                }
            }),
            containerModeInland: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/containermode",
                        data: {
                            containerMode : 'Road'
                        }
                    }
                }
            }),
            containerModeSea: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/containermode",
                        data: {
                            containerMode : 'Sea'
                        }
                    }
                }
            }),
            shipmentModeData: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/shipmentmode"
                }
            }),
            shipmentTypeData: new kendo.data.DataSource({
                serverFiltering: true,
                transport: {
                    read: "http://localhost/ingot3/web/app_dev.php/api/v1/dropdown/shipmenttype"
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
            }),
            shipper: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/parties",
                        data: {
                            query: function(){
                                return $("#shipper").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            consignee: new kendo.data.DataSource({
                transport: {
                    read: {
                        url: "http://localhost/ingot3/web/app_dev.php/api/v1/autocomplete/parties",
                        data: {
                            query: function(){
                                return $("#consignee").data("kendoAutoComplete").value();
                            }
                        }
                    }
                }
            }),
            portLoading: new kendo.data.DataSource({
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
            incoterm: new kendo.data.DataSource({
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
            movementType: new kendo.data.DataSource({
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
            processForm: function (e) {

                //$('#shipment-form').block({message: null, fadeIn: 0, fadeOut: 0});

                this.renderShipment();
                this.changeLabels();

                var tradeType = this.get('tradeType') !== undefined;
                var shipmentMode = this.get('shipmentMode') !== undefined;
                var containerMode = this.get('containerMode') !== undefined;

                if (tradeType && shipmentMode && containerMode) {
                    $('#shipment-form').unblock({message: null, fadeIn: 0, fadeOut: 0});
                }
            },
            renderShipment: function () {
                if (this.get('shipmentMode') === 'SEA') {
                    $('#shipment-form div.row[id=vehicle-row]').show();
                } else {
                    $('#shipment-form div.row[id=vehicle-row]').hide();
                }

                if (this.get('shipmentType') === 'DIR') {
                    $('#shipment-form div.row[id=carrier-row]').show();
                    $('#shipment-form div.row[id=voyageNo-row]').show();
                } else if (this.get('shipmentType') === 'HOU') {
                    $('#shipment-form div.row[id=carrier-row]').hide();
                    $('#shipment-form div.row[id=vehicle-row]').hide();
                    $('#shipment-form div.row[id=voyageNo-row]').hide();
                }
            },
            updateContainerMode: function (shipmentMode) {
                var containerMode = $('#containerMode').data("kendoDropDownList");
                switch (shipmentMode) {
                    case 'AIR' :
                        containerMode.setDataSource(new kendo.data.DataSource({}));
                        containerMode.enable(false);
                        break;
                    case 'SEA':
                        containerMode.setDataSource(this.get('containerModeSea'));
                        containerMode.enable();
                        break;
                    case 'ROA':
                        containerMode.setDataSource(this.get('containerModeInland'));
                        containerMode.enable();
                        break;
                }
            },
            updateShipperRequired: function (tradeType) {
                switch (tradeType) {
                    case 'IMP' :
                        $("#consignee").prop('required',true).addClass("k-invalid-msg");
                        $('#shipment-form label[for=consignee]').text('Consignee *');

                        $("#shipper").prop('required',false).removeClass("k-invalid-msg");
                        $('#shipment-form label[for=shipper]').text('Shipper');
                        $("#shipper").kendoValidator().data("kendoValidator").hideMessages();
                        break;
                    case 'EXP':
                        $("#shipper").prop('required',true).addClass("k-invalid-msg");
                        $('#shipment-form label[for=shipper]').text('Shipper *');

                        $("#consignee").prop('required',false).removeClass("k-invalid-msg");
                        $('#shipment-form label[for=consignee]').text('Consignee');
                        $("#consignee").kendoValidator().data("kendoValidator").hideMessages();
                        break;
                }
            },
            changeLabels: function () {
                switch (this.get('shipmentMode')) {
                    case 'AIR' :
                        $('#shipment-form label[for=portLoading]').text('Gateway');
                        $('#shipment-form label[for=portDischarge]').text('Destination');
                        $('#shipment-form label[for=carrier]').text('Airline');
                        $('#shipment-form label[for=voyageNo]').text('Flight Number');
                        $('#shipment-form label[for=dimensionalWeight]').text('Chargable Weight (kg)');
                        break;

                    case 'SEA' :
                        $('#shipment-form label[for=portLoading]').text('Port Loading');
                        $('#shipment-form label[for=portDischarge]').text('Port Discharge');
                        $('#shipment-form label[for=carrier]').text('Shipping Line');
                        $('#shipment-form label[for=vehicle]').text('Vessel');
                        $('#shipment-form label[for=voyageNo]').text('Voyage No');
                        $('#shipment-form label[for=dimensionalWeight]').text('Weight Measure (mt)');
                        break;

                    case 'ROA' :
                        $('#shipment-form label[for=portLoading]').text('From');
                        $('#shipment-form label[for=portDischarge]').text('To');
                        $('#shipment-form label[for=carrier]').text('Haulier');
                        $('#shipment-form label[for=voyageNo]').text('Registration No');
                        $('#shipment-form label[for=dimensionalWeight]').text('Weight Measure (mt)');
                        break;
                }
            }
        });

        kendo.bind($(".page-content"), viewModel);

        $(".page-content").kendoValidator().data("kendoValidator");

        $("#tradeType").kendoDropDownList({
            optionLabel: "Select Trade Type...",
            valuePrimitive: true
        });

        $("#shipmentMode").kendoDropDownList({
            optionLabel: "Select Shipment Mode...",
            valuePrimitive: true
        });

        $("#containerMode").kendoDropDownList({
            valuePrimitive: true,
            enable: false
        });

        $("#shipmentType").kendoDropDownList({
            optionLabel: "Select Shipment Type...",
            valuePrimitive: true
        });

        $("#portLoading").kendoAutoComplete({
            dataSource: ['Felixstowe, United Kingdom'],
            filter: "startswith",
            highlightFirst: true
        });

        $("#portDischarge").kendoAutoComplete({
            dataSource: ['Ningbo, China'],
            filter: "startswith",
            highlightFirst: true
        });

        $("#carrier").kendoAutoComplete({
            dataSource: ['Maersk'],
            filter: "startswith",
            highlightFirst: true
        });

        $("#vehicle").kendoAutoComplete({
            dataSource: ['Maersk Tanjong'],
            filter: "startswith",
            highlightFirst: true
        });

        $("#incoterm").kendoAutoComplete({
            dataSource: ['CIF (Cost Insurance and Freight)'],
            filter: "startswith",
            highlightFirst: true
        });

        $("#movementType").kendoAutoComplete({
            dataSource: ['Door to Door'],
            filter: "startswith",
            highlightFirst: true
        });

    });
});
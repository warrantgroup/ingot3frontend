requirejs.config({
    paths: {
        domReady: '../vendor/requirejs-domready/domReady',
        jquery: '../vendor/jquery/dist/jquery.min',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
        bootstraptagsinput: '../vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min',
        kendo: '../kendo/2014.2.903/js/kendo.all.min',
        blockui: '../vendor/blockui/jquery.blockUI'
    },
    shim: {
        bootstrap: ['jquery'],
        kendo: ['jquery', 'bootstrap'],
        bootstraptagsinput: ['jquery', 'bootstrap'],
        blockui: ['jquery']
    }
});

require([
    "jquery",
    "bootstrap",
    "bootstraptagsinput"
], initApp);

function initApp() {

}
requirejs.config({
    paths: {
        domReady: '../vendor/requirejs-domready/domReady',
        jquery: '../vendor/jquery/jquery.min',
        bootstrap: '../vendor/bootstrap/dist/js/bootstrap.min',
        kendo: '../kendo/2014.2.903/js/kendo.all.min',
        blockui: '../vendor/blockui/jquery.blockUI'
    },
    shim: {
        bootstrap: ['jquery'],
        kendo: ['jquery', 'bootstrap'],
        blockui: ['jquery']
    }
});

require([
    "jquery",
    "bootstrap"
], initApp);

function initApp() {
    
}
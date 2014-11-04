<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Silex\Provider\TwigServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app['debug'] = true;


$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/views',
    'twig.class_path' => __DIR__ . '/vendor/twig/lib',
));

$app->register(new DerAlex\Silex\YamlConfigServiceProvider(__DIR__ . '/config.yml'));
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

$twig = $app['twig'];
$twig->addGlobal("assetsPath", 'assets');
$twig->addExtension(new \Warrant\Twig\Extension\AssetExtension($app));


$app->get('/', function () use ($app) {
    return $app->redirect('shipment');
});

$app->get('/shipment', function () use ($app) {
    return $app['twig']->render('shipment/index.html.twig');
})->bind('shipment');

$app->get('/shipment/{ref}/details', function () use ($app) {
    return $app['twig']->render('shipment/details.html.twig');
})->bind('shipment_details');

$app->get('/shipment/{ref}/parties', function () use ($app) {
    return $app['twig']->render('shipment/parties.html.twig');
})->bind('shipment_parties');

$app->get('/shipment/{ref}/party/{partyType}/add', function () use ($app) {
    return $app['twig']->render('shipment/addParty.html.twig');
})->bind('shipment_party_add');

$app->get('/shipment/{ref}/containers', function () use ($app) {
    return $app['twig']->render('shipment/containers.html.twig');
})->bind('shipment_containers');

$app->get('/shipment/{ref}/packages', function () use ($app) {
    return $app['twig']->render('shipment/packages.html.twig');
})->bind('shipment_packages');

$app->get('/shipment/{ref}/communication', function () use ($app) {
    return $app['twig']->render('shipment/communication.html.twig');
})->bind('shipment_communication');

return $app;


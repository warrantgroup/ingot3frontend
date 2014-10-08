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
    return $app['twig']->render('index.html.twig');
});

/**
 * Shipment Wireframe
 */
$app->get('/wireframe/shipment/new', function () use ($app) {
    return $app['twig']->render('shipment/wireframe/newShipment.html.twig');
});

return $app;


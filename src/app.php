<?php
require_once __DIR__.'/../vendor/autoload.php';

use Silex\Provider\TwigServiceProvider;
use DerAlex\Silex\YamlConfigServiceProvider;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\ArrayAdapter;

$app = new Silex\Application();
$app['debug'] = true;

if (!is_writable(__DIR__.'/../cache')){
    //444 is readonly, 777 is readwrite
    echo 'Cache directory is not writable.';
    die();
}

$app->register(new Silex\Provider\TwigServiceProvider(), array('twig.path' => __DIR__.'/views'));
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());
$app->register(new DerAlex\Silex\YamlConfigServiceProvider(__DIR__ . '/config.yml'));
$app->register(new FranMoreno\Silex\Provider\PagerfantaServiceProvider());
$app->register(new Moust\Silex\Provider\CacheServiceProvider(), array(
    'cache.options' => array(
        'driver' => 'file',
        'cache_dir' => realpath(__DIR__ . '/../cache')
    )
));


$app->get('/', function() use ($app) {
    return $app->redirect($app["url_generator"]->generate("newShipment"));
});

/**
 * Stories Route
 */
$app->get('/newShipment', function() use ($app) {
    return $app['twig']->render('newShipment.html.twig');

})->bind('newShipment');


return $app;


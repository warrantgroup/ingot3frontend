Ingot 3 Front End
=================

Ingot 3 Front End used alongside Ingot3 repository which is used for the backend.

1. Install the Composer vendors (download Composer first from http://getcomposer.org)

    ```
    php composer.phar install
    ```

    Follow the instructions at the end to make sure that you have the parameters.yml
    file setup.

2. Make sure you have node and npm installed and setup. If you do, the following commands should work, other download and install node.js from http://nodejs.org/download/

    ```
    node -v
    npm -v
    ```

3. Use npm to install bower, compass and grunt-cli

    ```
    sudo npm install -g bower
    sudo npm install -g grunt-cli
    ```

4. Download the bower dependencies:

    ```
    bower install
    ```

    This should give you a populated `web/assets/vendor` directory.

5. Download the local node dependencies:

    ```
    npm install
    ```

    This should give you a `node_modules` directory.

6. Use grunt to initially compile the LESS files, and watch for any changes

    ```
    grunt
    ```




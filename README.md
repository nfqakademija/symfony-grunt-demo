Grunt Demo
==========

Demonstration of Symfony application with Grunt integrated into it.

## Requirements

  * NodeJS with NPM
    * `sudo apt-get install nodejs` on Debian based systems
    * Use [Installer from nodejs.org](http://nodejs.org/download/) on Windows
    * `brew install node` on Mac OS X
  * Globally installed Grunt-CLI and Bower packages via NPM
    * `sudo npm install -g grunt-cli bower`
  * Ruby
    * `sudo apt-get install ruby` on Debian based systems
    * Use [Ruby Installer](http://rubyinstaller.org/) on Windows
    * Mac OS X is shipped with Ruby preinstalled
  * Compass
    * `sudo gem install compass`

## Setting up

  * `npm install` to install node packages which are defined in package.json file
  * `bower install` to install bower components which are defined in package.json file

## Grunt tasks

  * `grunt watch` runs a watcher which listens for stylesheets or javascripts changes and recompiles them
  * `grunt clean` deletes /web/{css,fonts,img,js} directories
  * `grunt jshint` runs js syntax checker against /app/Resources/scripts/*.js files
  * `grunt concat` concatinates all js files which are defined in /app/Resources/scripts/concat.json
  * `grunt compass` runs compass against /app/Resources/style/ and puts compiled stylesheets to /web/css/
  * `grunt autoprefixer` runs [autoprefixer](https://github.com/postcss/autoprefixer) against /web/css/*.css files
  * `grunt imagemin` optimizes and copies images from /app/Resources/images/ to /web/img/
  * `grunt svgmin` optimizes and copies svg from /app/Resources/images/ to /web/img/ 
  * `grunt uglify` uglify js files in /web/js/ directory
  * `grunt copy` copies bootstrap fonts from bower_components to /web/fonts/
  * `grunt build` runs clean, copy, concat, uglify, compass, autoprefixer, imagemin, svgmin
  * `grunt` runs jshint and build tasks

## FAQ

### What changes were made to Symfony Standard Edition?

We have removed *assetic-bundle* from `composer.json` file as we are no longer using this. As well as we have removed all assetic related configuration from config.yml.

Also what is worth looking at is how we modified `app/Resources/views/base.yml.twig`

### Explain new lines in .gitignore

```
/web/css/
/web/js/
/web/fonts/
/web/img/
```

Those are compiled assets directories. We only want to version the source.

```
/node_modules/
/bower_components/
```

Those directories contain packages downloaded from npm and bower.

And `/.sass-cache/` is a cache saved at compilation from compass which shouldn't be versioned aswell.

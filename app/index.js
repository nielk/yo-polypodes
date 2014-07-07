'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var dir = {
  base: 'integration',
  src: 'integration/src'
}


var YoPolypodesGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {

        // Change working directory to 'gulp' for dependency install
        var npmdir = process.cwd() + '/integration';
        process.chdir(npmdir);
        this.installDependencies();
      }
    });
  },

  draw: function() {
    this.log('    __               ___      _                       _');
    this.log('   / /  ___  ___    / _ \\___ | |_   _ _ __   ___   __| | ___  ___');
    this.log('  / /  / _ \\/ __|  / /_)/ _ \\| | | | | \'_ \\ / _ \\ / _` |/ _ \\/ __|');
    this.log(' / /__|  __/\\__ \\ / ___/ (_) | | |_| | |_) | (_) | (_| |  __/\__ \\');
    this.log(' \\____/\\___||___/ \\/    \\___/|_|\\__, | .__/ \\___/ \\__,_|\\___||___/');
    this.log('                                |___/|_|');
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Les Polypodes generator!'));

    var prompts = [
    {
        name: 'appName',
        message: 'What is your web site\'s name ?'
    },
    {
      type: 'confirm',
      name: 'includeJQuery',
      message: 'Would you like to include jQuery?',
      default: true
    },
    {
      type: 'confirm',
      name: 'includeBootstrap',
      message: 'Would you like to include Bootstrap?',
      default: true
    }
    ];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      this.appName = props.appName;
      this.includeJQuery = props.includeJQuery;
      this.includeBootstrap = props.includeBootstrap;

      done();
    }.bind(this));
  },

  scaffoldFolders: function () {
    this.mkdir(dir.base);
    this.mkdir(dir.src);

    // layouts
    this.mkdir(dir.src + '/layouts');
    this.mkdir(dir.src + '/layouts/default-partials');
    this.mkdir(dir.src + '/layouts/home');

    // blocks
    this.mkdir(dir.src + '/blocks');
    this.mkdir(dir.src + '/blocks/header');
    this.mkdir(dir.src + '/blocks/footer');

    // common
    this.mkdir(dir.src + '/common');

    // test
    this.mkdir(dir.base + '/test');
    this.mkdir(dir.base + '/test/visual'); // wraith
    this.mkdir(dir.base + '/test/unit'); // jasmine
  },

  copyMainFiles: function () {

    var context = {
      site_name: this.appName
    };

    // dot files
    this.copy('_bower.json', dir.base + '/.bower.json');
    this.copy('_bowerrc', dir.base + '/.bowerrc');
    this.copy('_gitignore', dir.base + '/.gitignore');
    this.copy('_gulpfile.js', dir.base + '/gulpfile.js');
    this.copy('_jshintrc', dir.base + '/.jshintrc');
    this.copy('_package.json', dir.base + '/package.json');

    // javascript
    this.template('_main.js', dir.src + '/main.js', context);
    this.copy('_footer.js', dir.src + '/blocks/footer/footer.js');

    // jade
    this.copy('_index.jade', dir.src + '/layouts/index/index.jade');
    this.copy('__default.jade', dir.src + '/layouts/_default.jade');
    this.copy('__footer.jade', dir.src + '/blocks/footer/_footer.jade');
    this.template('__header.jade', dir.src + '/blocks/header/_header.jade', context);
    this.template('__html-header.jade', dir.src + '/layouts/default-partials/_html-header.jade', context);

    // less
    this.copy('__variables.less', dir.src + '/_variables.less');
    this.copy('_style.less', dir.src + '/style.less');
    this.copy('_footer.less', dir.src + '/blocks/footer/footer.less');

    // test
    this.copy('_config.yaml', dir.base + '/test/visual/configs/config.yaml');
    this.copy('_snap.js', dir.base + '/test/visual/javascript/snap.js');
  },

});

module.exports = YoPolypodesGenerator;

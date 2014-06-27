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

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Les Polypodes generator!'));

    var prompts = [
    {
        name: 'appName',
        message: 'What is your web site\'s name ?'
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  scaffoldFolders: function () {
    this.mkdir(dir.base);
    this.mkdir(dir.src);
    this.mkdir(dir.src + '/js');
    this.mkdir(dir.src + '/js/vendor');
    this.mkdir(dir.src + '/less');
    this.mkdir(dir.src + '/layouts');
    this.mkdir(dir.src + '/layouts/default-partials');
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
    this.template('_main.js', dir.src + '/js/main.js', context);

    // jade
    this.copy('_index.jade', dir.src + '/index.jade');
    this.copy('__default.jade', dir.src + '/layouts/_default.jade');
    this.copy('__footer.jade', dir.src + '/layouts/default-partials/_footer.jade');
    this.template('__header.jade', dir.src + '/layouts/default-partials/_header.jade', context);
    this.template('__html-header.jade', dir.src + '/layouts/default-partials/_html-header.jade', context);

    // less
    this.copy('__variables.less', dir.src + '/less/_variables.less');
    this.copy('_style.less', dir.src + '/less/style.less');
  },

});

module.exports = YoPolypodesGenerator;
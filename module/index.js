'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('Creating module : ' + this.name + '.');
  },

  files: function () {
    var context = {
      module_name: this.name
    };

    this.template('file.less', './integration/src/blocks/' + this.name + '/' + this.name + '.less', context);
    this.template('file.jade', './integration/src/blocks/' + this.name + '/' + this.name + '.jade', context);
    this.template('file.js', './integration/src/blocks/' + this.name + '/' + this.name + '.js', context);

    // @TODO write style.less add import
    var pathLess = './integration/src/style.less',
        pathJS   = './integration/src/main.js',
        fileLess     = this.readFileAsString(pathLess),
        fileJS     = this.readFileAsString(pathJS),
        hook     = '// #===== module hook =====#';

    this.write(pathLess, fileLess.replace(hook, '@import "./modules/' + this.name + '.less";' + '\n' + hook));
    this.write(pathJS, fileJS.replace(hook, 'var ' + this.name + ' = require(\'./blocks/' + this.name + '/' + this.name + '.js\');' + '\n' + hook));
  }
});

module.exports = ModuleGenerator;
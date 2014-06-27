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

    this.template('file.less', './integration/src/less/modules/' + this.name + '.less', context);
    this.template('file.jade', './integration/src/layouts/modules/' + this.name + '.jade', context);

    // @TODO write style.less add import
    var path = './integration/src/less/style.less';
    var file = this.readFileAsString(path);
    var hook = '#===== module hook =====#';
    this.write(path, file.replace(hook, '@import "./modules/'this.name'.less";' + '\n' + hook));
  }
});

module.exports = ModuleGenerator;
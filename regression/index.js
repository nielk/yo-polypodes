'use strict';
var util   = require('util'),
        fs = require('fs'),
      path = require('path'),
  execFile = require('child_process').execFile,
    yeoman = require('yeoman-generator');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    console.log('Launching screenshot comparison tool ...');
  },
  runWraith: function () {
    var args = ['capture','config'];

    var child = execFile('wraith', args);

    child.stdout.on('data', function(data) {
      console.log(data.toString());
    });
  }
});

module.exports = ModuleGenerator;
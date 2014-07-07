var footer = require('./blocks/footer/footer.js');
// #===== module hook =====#
var jQuery = jQuery || null;

/**
 * mon super site
 * @author  Les polypodes
 */
var myApp = (function($, undefined){
    'use strict';

    var myVar1 = '',
        myVar2 = '';

    /**
     * the init method
     * @param  {String} val a useless message
     * @return {void}     return nothing
     */
    var init = function(val){
        console.log(val);
    };

    /**
     * [anotherFunction description]
     * @return {[type]} [description]
     */
    var anotherFunction = function(){
        console.log(footer() + 'blabla');
    };

    return {
        init: function(val) {
            return init(val);
        },
        anotherFunction: function() {
            return anotherFunction(); //some function made public
        }
    };
})(jQuery);

myApp.init('Don\'t Live with Broken Windows');
myApp.anotherFunction();
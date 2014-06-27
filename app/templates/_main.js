/**
 * <%= site_name %>
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
        // ...
    };

    return {
        init: function(val) {
            return init(val);
        },
        anotherFunction: function() {
            return someFunction(); //some function made public
        }
    };
})(jQuery);

myApp.init('it works');
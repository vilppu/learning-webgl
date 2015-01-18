var application = require('application');

/* exported showApplicationOnCanvas */
var showApplicationOnCanvas = function() {    
    var canvas = document.getElementById('application-host');
    application.startOn(canvas);
};

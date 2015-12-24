var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({
        lazy: true
    });

module.exports = function() {

    var logType = {
        info: 0,
        warning: 1,
        error: 2
    };

    var logMessage = function(msg, level) {

        switch (level) {
            case logType.info:
                {
                    $.util.log(
                        $.util.colors.green(msg)
                    );
                    break;
                }
            case logType.error:
                {
                    $.util.log(
                        $.util.colors.red(msg)
                    );
                    break;
                }
            case logType.warning:
                {
                    $.util.log(
                        $.util.colors.yellow(msg)
                    );
                    break;
                }

        }

    };


    return {
        logType: logType,
        logMessage: logMessage
    };

}();

var gulp = require('gulp'),
    fs = require('fs'),
    through2 = require('through2'),
    plugins = require('gulp-load-plugins')({
        lazy: true
    }),
    config = require('../../gulp.config.js'),
    browserSync = require('browser-sync'),
    precompile = require('./precomp-pattern.js');

var reload = browserSync.reload;

module.exports = {

    createConfig: function(options) {

        var patternsData = [];
        var folder = [];

        var statistics = 0;

        var handleDuplicates = function(data) {

            var found = patternsData.filter(function(obj) {

                return obj.filepath === data.filepath;

            });

            var filepath = data.filepath.split('/')[0];

            if (found.length === 0) {

                patternsData.push(data);

            }

        };

        var updateConfig = function(event) {
            if (event.type === 'deleted') {
                console.log(event.path);
            }
        };

        var createItem = function(file, enc, callback) {

            var path = require('path');

            // init pattern configs
            var filename = path.basename(file.relative),
                extension = path.extname(file.relative),
                basename = filename.replace(extension, ''),
                patternpath = path.dirname(file.relative),
                title = basename.indexOf('_') === 0 ? basename.substr(1) : basename;

            // create pattern object
            var data = {
                title: title,
                description: '',
                filename: basename,
                filepath: file.relative
            };

            this.push(data);

            callback();

        };

        var writeConfigToFile = function() {

            var patternConfig = {
                patterns: patternsData,
                folder: [{
                    'name': 'atoms',
                    'description': 'Contains all atom elements'
                }, {
                    'name': 'molecules',
                    'description': 'Contains all molecule elements'
                }, {
                    'name': 'organism',
                    'description': 'Contains all organism elements'
                }, {
                    'name': 'templates',
                    'description': 'Contains all templates elements'
                }, {
                    'name': 'pages',
                    'description': 'Contains all pages elements'
                }]
            };

            var patterns = JSON.stringify(patternConfig, null, 4);

            fs.writeFile(options.configFile, patterns, function(err) {

                if (err) {
                    return plugins.util.log(
                        plugins.util.colors.red(err)
                    );
                }

                plugins.util.log(
                    plugins.util.colors.green('The file was saved!')
                );

                precompile(config.ssg);

            });
        };

        var logData = function() {

            console.log(statistics);
            console.log(patternsData.length);
            console.log(patternsData);
            writeConfigToFile();
        };

        var loadConfig = (function() {

            plugins.util.log('... Loading current configuration');

            var curConfigPath = options.configFile;

            var exists;

            try {

                exists = fs.statSync(curConfigPath);

            } catch (erro) {

                exists = null;
                return;

            }

            try {

                // Loading old configuration
                var config = fs.readFileSync(options.configFile);

                // parse json config
                var configData = JSON.parse(config);

                // check if configuration data exits
                patternsData = configData !== undefined &&
                    configData.patterns !== undefined ? configData.patterns : [];

                plugins.util.log(
                    'Found',
                    patternsData.length,
                    'pattern(s) in current configuration.');

                statistics = patternsData.length;

            } catch (err) {

                plugins.util.log(plugins.util.colors.red(err));

            }
        }());

        return gulp.src(options.patterns, {
                read: false
            })
            .pipe(plugins.plumber())
            .pipe(plugins.print())
            .pipe(through2.obj(createItem))
            .on('data', handleDuplicates)
            .on('end', logData);
    },

    fsEvents: function(event) {

        var updateCause = {
            deleted: 'marked patterns for deletion',
            renamed: 'pattern was renamed',
            added: 'new pattern added',
            cleanup: 'some legacy patterns was removed'
        };

        // include path for file handling
        var path = require('path');

        // load current configuration
        var currentConfig = require('../../app/_config/pattern.conf.json');


        var getRelativePath = function(filePath) {
            return path.relative(path.resolve(config.basepath + '_pattern/'), filePath);
        };

        var patternPrecompile = function() {

            plugins.util.log(
                plugins.util.colors.green('Precompile Patterns')
            );

            precompile(config.ssg)
                .on('error', function(a,b,c) {
                    
                    console.log(a);
                    console.log(b);
                    console.log(c);

                    plugins.util.log(
                        plugins.util.colors.green('Precompilation failed.')
                    );

                })
                .on('end', function() {

                    plugins.util.log(
                        plugins.util.colors.green('Precompilation finished.')
                    );

                    reload();

                });

        };

        // write configuration to file
        var updateConfigFile = function(newConfig, cause) {

            if (cause === null || cause === undefined) {
                cause = '';
            }

            newConfig.patterns.sort(function(a, b) {
                return a.filepath > b.filepath ? 0 : -1;
            });

            var patterns = JSON.stringify(newConfig, null, 4);

            fs.writeFile(config.patternConfig, patterns, function(err) {

                if (err) {
                    return plugins.util.log(
                        plugins.util.colors.red(err)
                    );
                }

                plugins.util.log('Configuration updated:',
                    plugins.util.colors.green(cause)
                );

                precompile(config.ssg);
                plugins.util.log(
                    plugins.util.colors.cyan('Pattern precompiled')
                );

            });

        };

        // Added Event
        var added = function(pathToFile) {

            var file = getRelativePath(pathToFile);

            // push pattern into config

            var path = require('path');

            // init pattern configs
            var extension = path.extname(file),
                patternpath = path.dirname(file),
                basename = file.replace(extension, '').replace(patternpath + '/', ''),
                title = basename.indexOf('_') === 0 ? basename.substr(1) : basename;

            // create pattern object
            var item = {
                title: title,
                description: '',
                filename: basename,
                filepath: file
            };

            // check if item exists
            var itemExits = currentConfig.patterns.filter(function(obj) {
                return obj.filepath === file;
            });

            if (itemExits.length === 0) {

                currentConfig.patterns.push(item);
                currentConfig.patterns = cleanup(currentConfig.patterns);

                updateConfigFile(currentConfig, updateCause.added);

            }

        };

        // Rename Event
        var renamed = function(pathToFile, oldPathToFile) {

            var curFile = getRelativePath(pathToFile);
            var oldFile = getRelativePath(oldPathToFile);

            var oldItem = currentConfig.patterns.filter(function(obj) {
                return obj.filepath === oldFile;
            });

            var newPatterns = currentConfig.patterns.filter(function(obj) {
                return obj.filepath !== oldFile;
            });

            console.log(oldPathToFile);

            if (oldItem.length !== 0) {

                // unmark delete property
                delete(oldItem[0].delete);

                // Update file path properties
                var filename = path.basename(curFile),
                    extension = path.extname(curFile),
                    basename = filename.replace(extension, ''),
                    patternpath = path.dirname(curFile);

                // set new file path properties
                oldItem[0].filename = basename;
                oldItem[0].filepath = curFile;

                newPatterns.push(oldItem[0]);

                currentConfig.patterns = cleanup(newPatterns);

                updateConfigFile(currentConfig, updateCause.renamed);

            } else {
                added(pathToFile);
            }

        };

        // Delete Event
        var deleted = function(pathToFile) {

            var file = getRelativePath(pathToFile);

            // get affected pattern entry
            var itemToDelete = currentConfig.patterns.filter(function(obj) {
                return obj.filepath === file;
            });

            // get new patterns without affected pattern entry
            var newPatterns = currentConfig.patterns.filter(function(obj) {
                return obj.filepath !== file;
            });

            if (itemToDelete.length !== 0) {

                // Mark item for deletion
                itemToDelete[0].delete = true;

                // Add remove marker to patterns
                newPatterns.push(itemToDelete[0]);

                // assign updated remove marker
                currentConfig.patterns = newPatterns;

                // writing changes to configuration
                updateConfigFile(currentConfig, updateCause.deleted);

            }
        };

        var cleanup = function(patterns) {

            var cleanedPattern = patterns.filter(function(obj) {
                return obj['delete'] === undefined;
            });

            return cleanedPattern;

        };

        var handleFSDelete = function(event) {

            var filepath = path.relative(path.resolve(config.basepath + '_pattern/'), event.path);

            var currentConfig = require('../../app/_config/pattern.conf.json');
            var currentPatterns = currentConfig.patterns;

            var newPatterns = currentPatterns.filter(function(obj) {
                return obj.filepath !== filepath;
            });

            var affectedPattern = currentPatterns.filter(function(obj) {
                return obj.filepath === filepath;
            });

            currentConfig.patterns = newPatterns;

            var patterns = JSON.stringify(currentConfig, null, 4);

            fs.writeFile(config.patternConfig, patterns, function(err) {

                if (err) {
                    return plugins.util.log(
                        plugins.util.colors.red(err)
                    );
                }

                plugins.util.log(affectedPattern[0].title,
                    plugins.util.colors.green('pattern removed from config.')
                );

            });
        };

        if (event.type === 'added') {

            // add new file to configuration
            added(event.path);

        }

        if (event.type === 'renamed') {

            // renamed
            renamed(event.path, event.old);

        }

        if (event.type === 'deleted') {

            // delete
            deleted(event.path);

        }

        // Cleanup old items
        if (event.type === 'changed') {

            var patternCount = currentConfig.patterns.length;
            var newPattern = cleanup(currentConfig.patterns);

            console.log('Pattern count before:' + patternCount);
            console.log('Pattern count after:' + newPattern.length);

            if (patternCount !== newPattern.length) {

                currentConfig.patterns = newPattern;

                updateConfigFile(currentConfig, updateCause.deleted);

            } else {

                patternPrecompile();

            }

        }

    }

};

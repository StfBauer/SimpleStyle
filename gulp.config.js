module.exports = (function() {

    // base path of app
    var basepath = './app/',
        appdir = process.cwd() + '/app/',
        temp = basepath + '.tmp/';

    // additional shortcuts
    var config = {
        basepath: basepath,
        patternConfig: basepath + '_config/pattern.conf.json',
        patterns: [
            basepath + '_pattern/**/*.hbs'
        ],
        ssg: {
            partials: [
                basepath + '_pattern/**/*.hbs',
                basepath + '_core/**/_*.hbs'
            ],
            templates: [
                basepath + '_pattern/**/[^_]*.hbs'
            ],
            namespace: 'ssg.templates'
        },
        core: {
            partials: [
                basepath + '_core/**/_*.hbs'
            ],
            templates: [
                basepath + '_core/**/[^_]*.hbs'
            ],
            namespace: 'ssgCore.templates'
        },
        docs: basepath + '_pattern.docs/',
        configs: basepath + '_config/',
        preCompTemplates: 'precomp.js',
        tempFiles: '.tmp/',
        namespaces: {
            patterns: 'App.Templates',
            coreApp: 'SsgCore.Templates'
        },
        // wiredep options
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'

        },
        // Javascript for injection
        js: [
            temp + '**/*.js',
            basepath + 'scripts/**.js',
            basepath + '_core/**/*.js'
        ],
        devjs: [
            basepath + 'scripts/**.js',
            './app/_core/scripts/*.js'
        ],
        html: [
            basepath + '**/*.html',
            basepath + '**/*.htm'
        ],
        // landing page
        landingPages: [basepath + 'index.html'],


    };


    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath,
            src: [
                basepath + '/*.htm[l]'
            ],
            dependencies: true,
            devDependencies: true,
            includeSelf: false,

        };
        return options;
    };

    return config;

}());

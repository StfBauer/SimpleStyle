/* globals ssgCore,ssg,$,Handlebars,baseComponents,Prism */

// var ssgCore = ssgCore || {};

var curConfig;

var debug = (function() {


}());

// Build UI
// Filter
// Session Handling
// Render Style Guide
// Constructor
// Core components
ssgCore.components = {};

ssgCore.itemSelector = null;

ssgCore.components.addButton = function(item, target) {

    var button = Handlebars.partials.buttons;
    var filter = button(item);
    $(target).append(filter);
};

ssgCore.components.toc = function() {

    this.addButton(baseComponents.toc, baseComponents.toc.target);

};

ssgCore.components.filter = function() {

    var btnFilter = baseComponents.filterButtons;

    for (var i = 0; i < btnFilter.items.length; i++) {

        this.addButton(btnFilter.items[i], btnFilter.target);

    }

};

ssgCore.components.renderPatterns = function() {

    var patternItem = ssgCore.templates.patternItem,
        patternCont = $('#ssg-patterns-inner');

    var patterns = ssgCore.curConfig.patterns;

    for (var i = 0; i < patterns.length; i++) {

        var curPattern = patterns[i];

        var patternContent = ssg.templates[curPattern.filename];

        var baseContainer = curPattern.filepath.split('/')[0];

        curPattern.baseFilter = baseContainer;

        // Check if can be compiled
        if (patternContent !== undefined) {
            patternContent = patternContent();
        }

        curPattern.sample = patternContent;

        var content = patternItem(curPattern);

        patternCont.append(content);

    }


};

ssgCore.components.showAll = function() {

    $('.ssg-item[data-cat=\'templates\']').addClass('hide');
    $('.ssg-item[data-cat=\'pages\']').addClass('hide');

};

ssgCore.components.tocBuilder = function(data) {

    var patterns = data.patterns;

    var folder = data.folder;

    for (var i = 0; i < folder.length; i++) {

        $('#ssg-toc').append(
            '<ul><li id=ssg-' + folder[i].name + ' class=ssg-toc-header>' +
            folder[i].name +
            '</li><ul id=ssg-' + folder[i].name + '-items class=ssg-toc-items></ul></ul>'
        );

    }

    for (var j = 0; j < patterns.length; j++) {

        var folderpath = patterns[j].filepath.split('/')[0];

        var patternTitle = '<li class=ssg-toc-item data-filter=\"' +
            patterns[j].filename + '\">' +
            patterns[j].title + '</li>';

        var currentSection = $('#ssg-' + folderpath + '-items');

        if (currentSection.length !== 0) {

            currentSection.append(patternTitle);

        }

    }
};

ssgCore.components.resize = function() {

    var curWidth,
        maxWidth = $(document).width(),

        widthCtrl = $('#ssg-vp-w'),

        patternsContainer = '#ssg-patterns',
        patternsCtrl = $(patternsContainer),

        patternsInnerContainer = '#ssg-patterns-inner',
        patternsInnerCtrl = $(patternsInnerContainer),
        discoBtn = $('#ssg-btn-disco');

    if (patternsCtrl.length !== 0 && patternsCtrl.hasClass('animate') === false) {
        patternsCtrl.addClass('animate');
    }

    if (patternsInnerCtrl.length !== 0 && patternsInnerCtrl.hasClass('animate') === false) {
        patternsInnerCtrl.addClass('animate');
    }

    if (discoBtn.length !== 0 && discoBtn.hasClass('active')) {

        do {

            curWidth = Math.floor((Math.random() * maxWidth) + 1);

        } while (curWidth < 320);

        if (patternsCtrl.length !== 0) {

            // assign current width
            if (widthCtrl.length !== 0) {
                widthCtrl.val(curWidth);
            }

            patternsCtrl.css({
                'width': curWidth,
                'min-width': '0px'
            });

            // Add animation class to make use off CSS3 animations

        }

        // restart animation
        window.setTimeout(
            ssgCore.components.resize,
            1000);

    } else {

        // Remove style to resize to normal
        patternsCtrl.css('width', '100%');

        // Delay and wait until resize finished and remove rest
        setTimeout(function() {

            patternsCtrl.removeAttr('style').delay(1000).removeClass('animate');

            patternsInnerCtrl.removeAttr('style').delay(1000).removeClass('animate');

        }, 1000);

    }
};

ssgCore.components.viewPortResizer = function() {

    var width = $(window).width();
    var height = $(window).height();

    var curWindow = {
        'width': width,
        'height': height
    };

    var vpResizer = ssgCore.templates.vpresizer(curWindow);

    $('#ssg-vp-resizer').append(vpResizer);
};

ssgCore.components.additionalTools = function() {

    var btnFilter = baseComponents.additionalTools;

    for (var i = 0; i < btnFilter.items.length; i++) {

        this.addButton(btnFilter.items[i], btnFilter.target);

    }

};

ssgCore.components.addSelector = function(items, index) {


    if (items.length === 0) {
        return;
    }

    var curItem = {},
        prev,
        next;

    if (index <= 0) {

        curItem.prevEnabled = 'disabled';

    }

    if (index >= items.length - 1) {

        curItem.nextEnabled = 'disabled';

    }

    curItem.title = items[index].title;
    curItem.index = index;

    var itemSelectorHtml = ssgCore.templates.itemselector(curItem);

    $('#ssg-item-selector').html(itemSelectorHtml);

    var patterns = $('.ssg-item[data-cat=' + ssgCore.Session.filter.get() + ']');
    console.log(patterns);

    if (patterns.length !== 0) {

        patterns.addClass('hide');
        var curPattern = $(patterns[index]);
        curPattern.removeClass('hide');
        curPattern.find('.ssg-item-code').addClass('show');

    }


};

ssgCore.components.loadConfig = function() {

    return $.getJSON('/_config/pattern.conf.json');

};


ssgCore.initUi = (function() {

    // Logging debug information
    // debug();
    ssgCore.components.loadConfig().done(function(data) {

        ssgCore.curConfig = data;
        ssgCore.components.tocBuilder(data);

        // render patterns
        ssgCore.components.renderPatterns();
        Prism.highlightAll();


        // retrieve current item filter
        var curFilter = ssgCore.Session.filter.get();

        // apply category filter
        ssgCore.UIHelper.setCategoryFilter(curFilter);

    });

    // init filter button
    ssgCore.components.filter();

    // init table of contents
    ssgCore.components.toc();

    // init view port resizer
    ssgCore.components.viewPortResizer();

    //
    ssgCore.components.additionalTools();

}());

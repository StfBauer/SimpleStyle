/* globals ssgCore,baseComponents,$ */
ssgCore.UIHelper = {};

ssgCore.UIHelper.setCategoryFilter = function(filter) {
    // setting correct button active

    ssgCore.Session.filter.add(filter);
    console.log('Set filter:  ' + filter);

    // regular filter behaviour
    console.log(typeof filter);
    console.log(filter);

    if (filter != null) {

        // filter items
        var currentItems,
            otherItems;

        $('#ssg-item-selector').html('');

        if (filter === 'templates' || filter === 'pages') {

            var allElements = $('.ssg-item[data-cat=' + filter + ']');
            otherItems = $('.ssg-item');
            otherItems.addClass('hide');

            // var test = $('.ssg-item[data-cat=' + filter + ']');

            this.enablePaging(allElements);

            currentItems = $('.ssg-item[data-cat=' + filter + ']');
            currentItems[0].removeClass('hide');

        } else {

            currentItems = $('.ssg-item[data-cat=' + filter + ']');
            otherItems = $('.ssg-item[data-cat!=' + filter + ']');

            currentItems.removeClass('hide');
            otherItems.addClass('hide');

        }

        var filterButton = $('#ssg-btn' + filter);

        if (filterButton.length !== 0) {

            filterButton.addClass('active');

        }

    } else {

        console.log('------___________-------');
        // show all elements
        $('.ssg-item').removeClass('hide');
        console.log($('.ssg-item'));
        // hide templates and pages
        $('.ssg-item[data-cat=pages]').addClass('hide');
        console.log($('.ssg-item'));
        $('.ssg-item[data-cat=templates]').addClass('hide');
        console.log($('.ssg-item'));
    
    }

};


ssgCore.UIHelper.enablePaging = function(elements) {

    var items = [];

    for (var i = 0; i < elements.length; i++) {

        var curItem = $(elements[i]);
        var curTitle = curItem.find('.ssg-item-title').text();

        var item = {
            title: curTitle
        };

        items.push(item);

    }

    ssgCore.itemSelector = items;
    ssgCore.components.addSelector(items, 0);

};

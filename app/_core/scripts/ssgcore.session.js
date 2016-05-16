/* globals ssgCore,baseComponents,$ */
ssgCore.Session = {};

ssgCore.Session.filter = {

    add: function(filterValue) {
        if (typeof(Storage) !== undefined) {
            sessionStorage.setItem('currentFilter', filterValue);
        }
    },
    get: function() {
        if (typeof(Storage) !== undefined) {
            return sessionStorage.getItem('currentFilter');
        } else {
            return null;
        }
    },
    remove: function() {
        if (typeof(Storage) !== undefined) {
            sessionStorage.setItem('currentFilter', null);
        }
    }

};

ssgCore.Session.uiOptions = {

    add: function(filterValue) {

        if (typeof(Storage) !== undefined) {
            if (sessionStorage.getItem('uiOptions') === null) {
                sessionStorage.setItem('uiOptions', '');
            }

            var currentUiOptions = sessionStorage.getItem('uiOptions');

            // Check if current uiOptions are set to isolate
            if (currentUiOptions.indexOf('isolate') !== -1) {
                sessionStorage.setItem('uiOptions', '');
                currentUiOptions = '';
            }

            // remove current field value if it can be found
            if (currentUiOptions.indexOf(filterValue) === -1) {
                currentUiOptions += ' ' + filterValue;
            } else {
                currentUiOptions = currentUiOptions.replace(filterValue, '');
            }

            currentUiOptions = currentUiOptions.trim();

            sessionStorage.setItem('uiOptions', currentUiOptions);

        }

    },
    get: function() {
        if (typeof(Storage) !== undefined) {
            return sessionStorage.getItem('uiOptions');
        } else {
            return null;
        }
    },
    remove: function() {
        if (typeof(Storage) !== undefined) {
            sessionStorage.removeItem('uiOptions');
            sessionStorage.setItem('uiOptions', '');
        }
    }

};

ssgCore.Session.Code = {



};

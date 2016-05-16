var baseComponents = {
    toc: {
        target: '#ssg-toolbar',
        action: 'toc',
        title: 'TOC',
        class: 'ssg-toc-switch'
    },
    additionalTools: {
        target: '#ssg-add-tools',
        items: [{
            action: 'isolate',
            title: 'Isolate',
            class: 'ssg-pattern-iso'
        }, {
            target: '#ssg-add-tools',
            action: 'showCode',
            title: 'Code',
            class: 'ssg-show-code'
        }, {
            target: '#ssg-add-tools',
            action: 'showAnnot',
            title: 'Annotation',
            class: 'ssg-show-annot'
        }]
    },
    filterButtons: {
        target: '#ssg-filter',
        items: [{
            action: 'atoms',
            title: 'Atoms',
            class: 'ssg-filter-button'
        }, {
            action: 'molecules',
            title: 'Molecules',
            class: 'ssg-filter-button'
        }, {
            action: 'orangism',
            title: 'Organism',
            class: 'ssg-filter-button'
        }, {
            action: 'templates',
            title: 'Templates',
            class: 'ssg-filter-button'
        }, {
            action: 'pages',
            title: 'Pages',
            class: 'ssg-filter-button'
        }]
    }
};

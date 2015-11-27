'use strict';

export default ($provide) => {
  'ngInject';
  $provide.decorator('taOptions', ['taRegisterTool', 'taToolFunctions', '$delegate', '$injector',
    function(taRegisterTool, taToolFunctions, taOptions, $injector) {
      taOptions.defaultTagAttributes.a.target = '_blank';

      taRegisterTool('customInsertImage', {
        tooltiptext: 'add image',
        iconclass: "fa fa-picture-o",
        action: function() {
          var textAngular = this;
          var savedSelection = rangy.saveSelection();

          var galleryModal = $injector.get('galleryModal');

          galleryModal.open()
            .then(image => {
              rangy.restoreSelection(savedSelection);
              textAngular.$editor().wrapSelection('insertImage', image.fileName, true);
            });
        },
        onElementSelect: {
          element: 'img',
          action: taToolFunctions.imgOnSelectAction
        }
      });

      taRegisterTool('customInsertFile', {
        tooltiptext: 'add file',
        iconclass: "fa fa-file-o",
        action: function() {
          var textAngular = this;
          var savedSelection = rangy.saveSelection();

          var storageModal = $injector.get('storageModal');

          storageModal.open()
            .then(file => {
              rangy.restoreSelection(savedSelection);
              textAngular.$editor().wrapSelection('createLink', file.name, true);
            });
        },
        onElementSelect: {
          element: 'a',
          action: taToolFunctions.aOnSelectAction
        }
      });

      taOptions.toolbar[3][1] = 'customInsertImage';
      taOptions.toolbar[3].splice(2, 0, 'customInsertFile');
      return taOptions;
    }
  ]);
};
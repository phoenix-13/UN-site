'use strict';

export default ($provide) => {
  'ngInject';
  $provide.decorator('taOptions', ['taRegisterTool', 'taToolFunctions', '$delegate', '$injector',
    function(taRegisterTool, taToolFunctions, taOptions, $injector) {
      taRegisterTool('customInsertImage', {
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

      taOptions.toolbar[3][1] = 'customInsertImage';
      return taOptions;
    }
  ]);
};
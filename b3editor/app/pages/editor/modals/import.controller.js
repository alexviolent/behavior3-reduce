(function() {
  'use strict';

  angular
    .module('app')
    .controller('ImportController', ImportController);

  ImportController.$inject = [
    '$scope',
    '$window',
    '$state',
    '$stateParams',
    'dialogService',
    'notificationService',
    'storageService',
	'protobufService'
  ];

  function ImportController($scope,
                            $window,
                            $state,
                            $stateParams,
                            dialogService,
                            notificationService,
                            storageService,
							protobufService) {
    var vm = this;
    vm.type         = null;
    vm.format       = null;
    vm.open         = open;
    vm.loadFromFile = loadFromFile;
    vm.data         = '';

    _active();

    function _active() {
      vm.type = $stateParams.type;
      vm.format = $stateParams.format;
    }
	
	function properties2obj(node){
		if(node.nodes){
			for( let child of node.nodes){
				properties2obj(child);
			}
		}
		
		if(node.properties){
			var reg=new RegExp("'","g");
			node.properties = JSON.parse(node.properties.replace(reg,"\""));
		}
	}

    function loadFromFile() {
      dialogService
        .openFile(false, ['.b3', '.b3bin', '.json'])
        .then(function(path) {
          storageService
            .loadAsync(path)
            .then(function(data) {
				// alert(path);
				if(path.split('.')[1] === 'b3bin'){
					let key = vm.type;
					data = protobufService.decode(key, data);
					if(key === "project") {
						for(let tree of data.trees){
							properties2obj(tree);
						}
					} else if ( key === "tree") {
						properties2obj(data);
					}
					vm.data = JSON3.stringify(data, null, 2);
				}
				
				vm.data = JSON3.stringify(data, null, 2);
            })
        });
    }
    function open() {
      var i = $window.editor.import;

      var data = JSON3.parse(vm.data);

      try {
        if (vm.type === 'project' && vm.format === 'json') {
          i.projectAsData(data);
        }
        else if (vm.type === 'tree' && vm.format === 'json') {
          i.treeAsData(data);
        }
        else if (vm.type === 'nodes' && vm.format === 'json') {
          i.nodesAsData(data);
        }
      } catch(e) {
        notificationService.error(
          'Invalid data',
          'The provided data is invalid.'
        )
      }

      $state.go('editor');
    }
  }

})()
(function() {
  'use strict';

  angular
    .module('app')
    .controller('ExportController', ExportController);

  ExportController.$inject = [
    '$scope',
    '$document',
    '$window',
    '$stateParams',
    'dialogService',
    'notificationService',
    'storageService',
	'protobufService'
  ];

  function ExportController($scope,
                            $document,
                            $window,
                            $stateParams,
                            dialogService,
                            notificationService,
                            storageService,
							protobufService) {
    var vm = this;
    vm.type        = null;
    vm.format      = null;
    vm.compact     = '';
    vm.pretty      = '';
    vm.result      = null;
    vm.data        = null;
    vm.hideCompact = false;
    vm.showCompact = showCompact;
    vm.showPretty  = showPretty;
    vm.select      = select;
    vm.save        = save;
	vm.saveAsBin = saveAsBin;

    _active();

    function _active() {
      vm.type = $stateParams.type;
      vm.format = $stateParams.format;

      var e = $window.editor.export;

      if (vm.type === 'project' && vm.format === 'json') {
        _createJson(e.projectToData());
      }
      else if (vm.type === 'tree' && vm.format === 'json') {
        _createJson(e.treeToData());
      }
      else if (vm.type === 'nodes' && vm.format === 'json') {
        _createJson(e.nodesToData());
      }
    }

    function _createJson(data) {
      vm.data = data;
      vm.compact = JSON3.stringify(data);
      vm.pretty = JSON3.stringify(data, null, 2);
      vm.result = vm.pretty;
    }

    function select(){
      var range = $document[0].createRange();
      range.selectNodeContents($document[0].getElementById('export-result'));
      var sel = $window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function save() {
      dialogService
        .saveAs(null, ['.b3', '.json'])
        .then(function(path) {
          storageService
            .saveAsync(path, vm.pretty)
            .then(function() {
              notificationService.success(
                'File saved',
                'The file has been saved successfully.'
              )
            })
        })
    }
	
	function properties2str(node) {
		if(!node){
			return;
		}
		
		if(node.properties){
			var reg=new RegExp("\"","g");
			var str = JSON.stringify(node.properties);
			node.properties = str.replace(reg,"'");
		}
		
		if(node.nodes){
			for(let child of node.nodes){
				properties2str(child);
			}
		}
		
	}
	
	function saveAsBin() {
		let data = vm.data;
		
		let key = data.scope;
		
		if(key === "project") {
			for(let tree of data.trees){
				properties2str(tree);
			}
		} else if ( key === "tree") {
			properties2str(data);
		}
		
		//Encode msg to binary Buffer
		var buffer = protobufService.encode(key, data);

		//Decode a msg from binary buffer
		var decodeMsg = protobufService.decode(key, buffer);
		console.log(decodeMsg);
		
		dialogService
        .saveAs(null, ['.b3bin'])
        .then(function(path) {
          storageService
            .saveAsync(path, buffer, true)
            .then(function() {
              notificationService.success(
                'File saved',
                'The file has been saved successfully.'
              )
            })
        })
	}

    function showCompact() {
      vm.result = vm.compact;
    }
    function showPretty() {
      vm.result = vm.pretty;
    }
  }

})()
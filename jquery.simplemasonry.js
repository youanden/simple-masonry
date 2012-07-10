(function($) {

	Array.max = function( array ){
	    return Math.max.apply( Math, array );
	};

	$.simplemasonry = function(element, options) {

        var defaults = {};
        var settings = $.extend({}, defaults, options);	        
		var $element = $(element);		
        var _ml = this;

		$.extend(_ml, {

			refresh: function() {  
				var $children = $element.children();      
				var childInfo = childElementInfo($children[0]);
				var width = childInfo['width'];
				var columns = childInfo['num'];
				var column_matrix = initialRange(columns);
				
				var renderChild = function(i) {
					var height = $(this).outerHeight();
					var col = 0;
					var addToCol = minIndex(column_matrix);
					var pos = addToCol * width;

					$(this).css({ 
						'position' : 'absolute',
						'left'     : pos + '%',
						'top'      : column_matrix[addToCol] + 'px'						
					});

					column_matrix[addToCol] += height;
				};

				$children
					.css({ 'overflow': 'hidden', 'zoom': '1' })
					.each(renderChild);

				$element.css({ 
					'position': 'relative',
					'height'  : Array.max(column_matrix) + 'px'
				});
			}

		});

		$(window).resize(_ml.refresh);
		_ml.refresh();
	};

	function minIndex(arry) {
		var minValue = Math.min.apply(Math, arry);
		return $.inArray(minValue,arry);
	}

	function initialRange(num) {
		var arry = [];
		for ( var i=0; i < num; i++ )
			arry.push(0);
		return arry;
	}

	function childElementInfo(elem) {
		var width = $(elem).outerWidth();
		var parentWidth = $(elem).offsetParent().width();
		return {
			'width' : 100 * width / parentWidth,
			'num'   : Math.floor(parentWidth / width)
		};
	}

    $.fn.simplemasonry = function(options) {
		if ( typeof options == 'string') {
			var instance = $(this).data('simplemasonry');
			var args = Array.prototype.slice.call(arguments, 1);
			if ( instance[options] )
				return instance[options].apply(instance, args);
			return;
		} else {
			return this.each(function() {
				if (undefined == $(this).data('simplemasonry')) {
					var plugin = new $.simplemasonry(this, options);
					$(this).data('simplemasonry', plugin);
				}
			});
		}
    }

})(jQuery);
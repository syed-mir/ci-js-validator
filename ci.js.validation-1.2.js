// CodeIgniter and JavaScript Validator v1.0 by Syed Mir
(function(window, document, $, undefined) {
	 "use strict";

	var testRegex = {
		valid_email : /^([\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,4})?$/,
		valid_ip: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
		alpha: /^([a-zA-zÀ-ÿ])+$/,
		alpha_numeric: /^([a-z0-9A-zÀ-ÿ])+$/,
		alpha_dash: /^([-a-zA-zÀ-ÿ0-9_-])+$/,
		numeric: /^[\-+]?[0-9]*\.?[0-9]+$/,
		integer: /^[\-+]?[0-9]+$/,
		decimal: /^[\-+]?[0-9]+\.[0-9]+$/,
		is_natural: /^[0-9]+$/,
		valid_base64: /[^a-zA-Z0-9\/\+=]/,
		phone_number: /^(\(\d{3}\)|\d{3})[\s-\.]?\d{3}[\s-\.]?\d{4}$/,
		postal_code: /^[A-Za-z]\d[A-Za-z][\ \-]{0,1}\d[A-Za-z]\d$/,
		postal_code_1: /^[A-Za-z]\d[A-Za-z]$/,
		postal_code_2: /^\d[A-Za-z]\d$/
	}

	//new get value function
	$.fn.getValue = function() {
		if ($(this).is('select')) {
    		var val = $(this).find(":selected").val();
     	} else if ($(this).prop('type') == "checkbox") {
     		if ($(this).prop("checked")) {
     			var val = $(this).val();
     		} else {
     			var val = "";
     		}
     	} else if ($(this).is('[type=radio]')) {	
     		var val = "";
     		$(this).each(function (i,v) {
     			if ($(v).prop("checked")) {
	     			val = $(v).val();
	     			return true;
	     		} 
     		});
    	} else {
    		//lets make sure the placeholder doesn't match the value
    		if ($(this).attr('placeholder') == $.trim($(this).val())) {
    			var val = "";
    		} else {
    			var val = $(this).val();
    		}
    	}
    	return val;
	}
	
	//validtion functions
	var sTester = function (config) {
	    var result = true;
	    return {
	    	field: config.field,
	    	selector: config.selector,
	    	pointer : config.selector(config.field),
	        required: function() {
	        	return (this.pointer.getValue().length != 0);
	        },
	        trim: function() {
	        	if (this.pointer.is('select') || this.pointer.is('[type=radio]') || this.pointer.is('[type=checkbox]')) {
	        		return true;
	        	}
	        	this.pointer.val($.trim(this.pointer.val()));
	        	return true;
	        },
	        min_length: function(num) {	        	
	        	return (this.pointer.getValue().length >= num);

	        },
	        max_length: function(num) {
	        	return (this.pointer.getValue().length <= num);
	        },
	        exact_length: function(num) {
	        	return (this.pointer.getValue().length == num);
	        },
	        valid_email: function() {
                return ( testRegex.valid_email.test( this.pointer.getValue() ) );
	        },
	        valid_ip: function() {
	        	return ( testRegex.valid_ip.test( this.pointer.getValue() ) );
	        },
	        alpha: function() {
	        	return ( testRegex.alpha.test( this.pointer.getValue() ) );
	        },
	        postal_code: function() {
	        	return ( testRegex.postal_code.test( this.pointer.getValue() ) );
	        },
	        postal_code_1: function() {
	        	return ( testRegex.postal_code.test( this.pointer.getValue() ) );
	        },
	        postal_code_2: function() {
	        	return ( testRegex.postal_code.test( this.pointer.getValue() ) );
	        },
	        alpha_numeric: function() {
	        	return ( testRegex.alpha_numeric.test( this.pointer.getValue() ) );
	        },
	        alpha_dash: function() {
	        	return ( testRegex.alpha_numeric.test( this.pointer.getValue() ) );
	        },
	        numeric: function() {
	        	if (this.pointer.getValue().length == 0) {
	        		return true;
	        	}
	        	return ( testRegex.numeric.test( this.pointer.getValue() ) );
	        },
	        is_numeric: function() {
	        	return ( testRegex.numeric.test( this.pointer.getValue() ) );
	        },
	        integer: function() {
	        	return ( testRegex.integer.test( this.pointer.getValue() ) );
	        },
	        decimal: function() {
	        	return ( testRegex.decimal.test( this.pointer.getValue() ) );
	        },
	        greater_than: function(num) {
	        	return ( this.pointer.getValue() > num );
	        },
	        less_than: function(num) {
	        	return ( this.pointer.getValue() < num );
	        },
	        is_natural: function() {
	        	return ( testRegex.is_natural.test( this.pointer.getValue() ) );
	        },
	        is_natural_no_zero: function() {
	        	if (this.pointer.getValue() == 0) { return false; }
	        	return ( testRegex.is_natural.test( this.pointer.getValue() ) );
	        },
	        valid_base64: function() {
	        	return ( testRegex.valid_base64.test( this.pointer.getValue() ) );
	        },
	        phone_number: function() {
	        	return ( testRegex.phone_number.test( this.pointer.getValue() ) );
	        },
	       	age_min: function(unix_timestamp) {
	  			var js_timestamp = unix_timestamp*1000;
	        	return (new Date(this.pointer.getValue()).getTime() >= js_timestamp);
	        },
	       	age_max: function(unix_timestamp) {
	  			var js_timestamp = unix_timestamp*1000;
	        	return (new Date(this.pointer.getValue()).getTime() <= js_timestamp);
	        },
	        matches: function(num) {
	        	var matchAgainst = this.selector(num);
	        	if (matchAgainst.is('select')) {
		    		var val = matchAgainst.find(":selected").val();
		    	} else {
		    		var val = matchAgainst.val();
		    	}
	        	return ( this.pointer.getValue() == val );
	        },
	        valid_date: function() {
	        	 if (isNaN(new Date(this.pointer.getValue()))) {
			        return false;
			    }
				var comp = this.pointer.getValue().split('/');
				var m = parseInt(comp[0], 10);
				var d = parseInt(comp[1], 10);
				var y = parseInt(comp[2], 10);
				var date = new Date(y,m-1,d);
				return (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d);
	        }
	    }
	}
	
	$.fn.ciJsValidator = function(options) {	
		var defaults = {
			validation_rules: [{ }],
			selector: function(name) {
				return $('[name="'+name+'"]');
			},
			display_error: function(name, rule, label, param) {
				if(typeof this.error_messages[rule] != 'undefined') {
	        		$('#error').append(this.error_messages[rule].replace("%s", label).replace("%s", param));
	        } else {
	        	$('#error').append(name + rule);
	        }
	       },
			clear_error: function() {
				$('#error').empty();
			},
			error_messages: [{}],
			button: $(this).find("input[type=submit]")
		};

        var options = $.extend(defaults, options);
        
        options.button.click(function() {
        	var result = true;
        	options.clear_error();
        	
        	if (options.validation_rules.length  == 0) {
            	throw new Error('nothing to validate');
        	}        
       
	        $.each(options.validation_rules, function(x, set) {
	        	if (set.length == 0) {
	        		 throw new Error(x + 'has no rules');
	        	}
	        	var rules = set.rules.split("|");
	        	var field = set.field;
	        	var label = set.label;
	        	
	        	if (options.selector(field).length == 0) { return; }
	        	
	        	var tester = new sTester({"field" : field,"selector": options.selector});
	        	 
	        	$.each(rules , function(i, rule) {
					var myRegexp = /\[([0-9A-Za-z\_]+)\]/g;
					var param = myRegexp.exec(rule);
	        		var rule = rule.replace(/\[[0-9A-Za-z\_]+\]/g, "");
		        	if (param !=  null) {
		        		param = param[1];
		        	} else {
		        		param = "";
		        	}
		        	if (typeof tester[rule] != 'function') { 
		        		return;
		        	}      		
	        		if (tester[rule](param) == false) {
	        			options.display_error(field,rule, label, param);
	        			result = false;
	        			return false;
	        		}
	        	});  	
	        });
	        return result;
        });
	}
}(this, this.document, jQuery));

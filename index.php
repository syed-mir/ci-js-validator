<?php
//Example of CodeIgniter Form Validation Config File
//Usually in the file form_validation.php
$config = array(
	'registration' => array(
		array('field'   => 'first_name','label'   => 'First name', 'placeholder' => 'first name', 'rules'   => 'trim|required|min_length[1]|max_length[50]'),
		array('field'   => 'last_name','label'   => 'Last name', 'placeholder' => 'last name', 'rules'   => 'trim|required|min_length[1]|max_length[50]'),
		array('field'   => 'email', 'label'   => 'Email', 'placeholder' => 'email address' , 'rules'   => 'trim|required|valid_email')
	)
);

//Example of CodeIgniter error messages 
//Usually located in the following language file: language/english/form_validation_lang.php
include('lang.php');

?>
<!DOCTYPE html>
<head>
<meta charset="utf-8">
<title>Demo</title>
</head>
<body>
<div>
	<div id="error">
	</div>
	<form action="/registration" method="post" enctype="multipart/form-data" accept-charset="UTF-8">
		<fieldset>
			<label for="first_name">First Name (required)</label>
			<input id="first_name" name="first_name" type="text" value="" placeholder=""/>
			<label for="last_name">Last Name (required)</label>
			<input id="last_name" name="last_name" type="text" value="" placeholder=""/>
			<label for="email">E-Mail (required)</label>
			<input id="email" name="email" type="text" value="" placeholder=""/>
			<input class="submit" type="submit" value="Submit"/>
		</fieldset>
	</form>
</div>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="ci.js.validation-1.2.js"></script>
<script>
	$(document).ready(function(){
		$('form').ciJsValidator({
			//optional
			"selector": function(name) {
				return $('[name="'+name+'"]');
			},
			//optional
			"display_error": function(name, rule, label, param) {
				if(typeof this.error_messages[rule] != 'undefined') {
					$('#error').append(this.error_messages[rule].replace("%s", label).replace("%s", param)+"<br>");
				} else {
					$('#error').append(name + rule);
				}
	       		},
			//optional
			"clear_error": function() {
				$('#error').empty();
			},
			//optional
			"button": $(this).find("input[type=submit]"),
			//required
			"validation_rules": <?=json_encode($config['registration'])?>,
			//required
			"error_messages": <?=json_encode($lang)?>, 
		});
	});
</script>
</body>
</html>

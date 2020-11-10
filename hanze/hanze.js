jQuery(document).ready(function($) {
	
	
	valid = false;
	page = "";
	
	if ($(".containerPortal .portlet").length > 0) {
		page = "dashboard";
		valid = true;
	}
	
	else if ($("#globalNavPageContentArea #breadcrumbs.breadcrumbs").length > 0) {
		valid = true;
		page = "content";
	} 
	
	console.log("page:", page);

	if (valid) {
		for (var i = 0; i < 10; i++) {
			$("#css_" + i).remove();
		}
		
		$("<link type='text/css' rel='stylesheet' href='https://www.jossafossa.nl/hanze.css'>").appendTo("body");
	}
})

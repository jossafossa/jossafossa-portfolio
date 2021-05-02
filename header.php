<?php include "functions.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Joost Hobma - Portfolio</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name=description content="Hi, my name is Joost Hobma. I studied MBO media at Friesland College and now I'm studying HBO-ICT @ Hanze Groningen. In my free time I occasionally like to build simple JavaScript projects. All of which you can check out at my project page</a>. This website is also custom built from the ground up. When making this website I promised myself not to use any libraries or scripts, so everything you see here is built by me :).">
	<link rel="shortcut icon" type="image/png" href="img/favicon.png"/>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">


	<script src="https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>
	<script>
	 WebFont.load({
	    google: {
	      families: ['Open+Sans:400,400i,700', 'Quicksand:400,700']
	    }
	  });
	</script>
	<!-- Hotjar Tracking Code for http://www.jossafossa.nl -->
	<script>
	    (function(h,o,t,j,a,r){
	        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
	        h._hjSettings={hjid:1218095,hjsv:6};
	        a=o.getElementsByTagName('head')[0];
	        r=o.createElement('script');r.async=1;
	        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
	        a.appendChild(r);
	    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
	</script>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-55297477-5" defer></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());

	  gtag('config', 'UA-55297477-5');
	</script>
	<link href="assets/build/main.css" rel="stylesheet">


</head>
<body>

	<div class="main-container">
		<div class="header">		
					
			<img class="header_logo" src="assets/img/logo.svg" alt="JossaFossa logo">
			<span class="header_text textTyper">&nbsp;</span>
		</div>
		<div class="content-container">
			<div class="menu-container">

				<div class="menu">
					<div class="menu-switch">
						<input type="checkbox" id="darkModeSwitch" class="darkmode-switch">

						<label for="darkModeSwitch"  tooltip="toggle darkmode">
							<span class="stars">
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
								<span></span>
							</span>
							<span class="clouds">
								<span></span>
								<span></span>
								<span></span>
							</span>
							<span class="dot">
								<span class="circle"></span>
								<span class="moon-dot"></span>
								<span class="sun-rays">
									<span></span>
									<span></span>
									<span></span>
									<span></span>
								</span>
							</span>
						</label>
					</div>
					<?php the_menu($menu); ?>

					</div>
			</div>
			<div class="content">
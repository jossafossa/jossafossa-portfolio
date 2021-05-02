
<div class="about">	
	<div class="text-container">
		<h1 class="page-title">Who is that Jossafossa guy?</h1>
		<div class="flex-container flex-center flex-margin-l">
			<div class="column">
				<div class="about_photo"></div>
				<?php $images = get_images("./assets/img/ik/"); ?>
				<script>
					let allAboutPhotos = ['<?= join("','", $images); ?>'];
				</script>
			</div>
			<div class="column stretch">
				<p>Hi, my name is Joost Hobma. I studied MBO media at Friesland College and now I'm studying <i>HBO-ICT</i> @ Hanze Groningen. In my free time I occasionally like to build simple <i>JavaScript</i> projects. All of which you can check out at my <a href="#" page="projects">project page</a>. This website is also custom built from the ground up. When making this website I promised myself not to use any libraries or scripts, so everything you see here is built by me :). 
				</p>
				<p>I love to write clean <i>CSS / HTML</i> interfaces. Writing <i>CSS animations</i> & <i>flexbox layouts</i> is like a drug for me.
				<p>Besides that I also learned how to work with <i>PHP and Wordpress</i>. I've worked fulltime for about 2 years at <a href="//mediasoep.nl/">Mediasoep</a> and learned a lot about building easy to use <i>custom Wordpress websites</i>.</p>
			</div>
		</div>
	</div>
	<hr>
	<div class="text-container">
		<h1 class="page-title">Contact Info</h1>
		<div class="flex-container flex-center">
			<a href="https://www.linkedin.com/in/jossafossa/" tooltip="Visit my LinkedIn!" target="_blank" class="button round linkedin-color center"><i class="fab fa-linkedin-in"></i></a>
			<a href="mailto:info@jossafossa.nl" class="button round center" tooltip="Email me!"><i class="fa fa-envelope"></i></a>
			<a href="/CV" class="button round center" tooltip="View my CV"><i class="fa fa-scroll"></i></a>
		</div>
	</div>
</div>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-55297477-5"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-55297477-5');
</script>

<?php 
	$fp = fopen('count.txt', 'c+');
	flock($fp, LOCK_EX);

	$count = (int)fread($fp, filesize('count.txt'));
	ftruncate($fp, 0);
	fseek($fp, 0);
	fwrite($fp, $count + 1);

	flock($fp, LOCK_UN);
	fclose($fp);
?>

<script>
	window.addEventListener("load", function(){
		window.location.href = "https://www.jossafossa.nl";
	});
</script>
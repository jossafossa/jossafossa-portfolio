

	<?php if ($projects): ?>
		<div class="projects">
			<span tooltip="Wait! What is this doing here?">?></span>
			<h1 class="page-title">My work</h1>
		
			<div class="projects-container">
			<?php foreach ($projects as $project): ?>
				<div class="projects_item"  style="--project-color: <?= $project->color; ?>">
					<a href="<?= $project->url ?>">
						<?php echo $project->favorite ? '<div class="projects_item_favourite" tooltip="I\'m proud of this one"></div>' : ''; ?>
						<span class="projects_item_ratio">							
							<img class="projects_item_image" src="<?= $project->background; ?>" alt="<?= $project->title; ?>">
						</span>
						<div class="projects_item_summary"><span><?= $project->description; ?></span></div>
						<div class="projects_item_inner">
							<h2 class="projects_item_title"><?= $project->title; ?></h2>
						</div>
					</a>
				</div>
			<?php endforeach; ?>
				
			</div>
		
		</div>
	<?php endif; ?>	

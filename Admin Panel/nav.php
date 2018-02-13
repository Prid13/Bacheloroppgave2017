<!-- Navigation -->
<nav id="mainNav" class="navbar static-top navbar-toggleable-md navbar-inverse bg-primary">
	<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarExample" aria-controls="navbarExample" aria-expanded="false" aria-label="Toggle navigation">
		<span class="navbar-toggler-icon"></span>
	</button>
	<a class="navbar-brand" href="admin.php"><b>MemoFrame</b> Admin Panel</a>
	<div class="collapse navbar-collapse" id="navbarExample">
		<ul class="sidebar-nav navbar-nav">
			<li class="nav-item <?= $l == "dashboard" ? "active" : ""; ?>">
				<a class="nav-link" href="admin.php"><i class="fa fa-fw fa-dashboard"></i> Dashboard</a>
			</li>
			<li class="nav-item">
				<a class="nav-link nav-link-collapse <?= ($l == "all_tests" || $l == "new_test") ? "" : "collapsed"; ?>" data-toggle="collapse" href="#collapseComponents1"><i class="fa fa-fw fa-file"></i> Tests</a>
				<ul class="sidebar-second-level collapse <?= ($l == "all_tests" || $l == "new_test") ? "show" : ""; ?>" id="collapseComponents1">
					<li class="<?= $l == "all_tests" ? "active" : ""; ?>">
						<a href="tests.php">All Tests</a>
					</li>
					<li class="<?= $l == "new_test" ? "active" : ""; ?>">
						<a href="new_test.php">New Test</a>
					</li>
				</ul>
			</li>
			<li class="nav-item">
				<a class="nav-link nav-link-collapse <?= ($l == "all_pincodes" || $l == "new_pincode") ? "" : "collapsed"; ?>" data-toggle="collapse" href="#collapseComponents2"><i class="fa fa-fw fa-file"></i> Pincodes</a>
				<ul class="sidebar-second-level collapse <?= ($l == "all_pincodes" || $l == "new_pincode") ? "show" : ""; ?>" id="collapseComponents2">
					<li class="<?= $l == "all_pincodes" ? "active" : ""; ?>">
						<a href="pincodes.php">All Pincodes</a>
					</li>
					<li class="<?= $l == "new_pincode" ? "active" : ""; ?>">
						<a href="new_pincode.php">New Pincode</a>
					</li>
				</ul>
			</li>
		</ul>
		<ul class="navbar-nav ml-auto">
			<li class="nav-item">
				<a class="nav-link" href="logout.php"><i class="fa fa-fw fa-sign-out"></i> Logout</a>
			</li>
		</ul>
	</div>
</nav>
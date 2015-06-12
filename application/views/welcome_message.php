<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en" ng-app="scroll" ng-controller="mainCtrl">
<head>
	<meta charset="utf-8">
	<title>Skillscroll</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>css/style.css">
	<base href="<?php echo base_url() ?>" />
</head>
<body>
	<div class="topbar">
		<a href="<?php echo base_url() ?>" class="brand"><span class="skill">Skill</span><span class="scroll">Scroll</span></a>
		<div class="swp">
			<form action="search/" class="main-form" autocomplete="off">
				<input class="main-input" type="text" name="q" placeholder="Search for people or skills">
			</form>
		</div>
		<div ng-cloak class="uac">
			<span ng-if="!loggedIn" class="login">Login</span>
			<span ng-if="loggedIn" >{{username}}</span>
		</div>
	</div>
	<ng-view></ng-view>

	<script type="text/javascript" src="<?php echo base_url(); ?>components/angular/angular.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>components/angular-route/angular-route.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/config.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/Ctrl.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/services.js"></script>
</body>
</html>
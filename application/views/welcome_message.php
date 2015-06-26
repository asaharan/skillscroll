<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en" ng-app="scroll" ng-controller="mainCtrl">
<head>
	<meta charset="utf-8">
	<title>Skillscroll</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>css/style.css">
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>components/angular-material/angular-material.min.css">
	<base href="<?php echo base_url() ?>" />
</head>
<body>
	<div class="topbar">
		<a href="<?php echo base_url() ?>" class="brand"><span class="skill">Skill</span><span class="scroll">Scroll</span></a>
		<div class="swp">
			<form action="search/" class="main-form" autocomplete="off">
				<input class="main-input" type="text" name="q" placeholder="Search for people or some topic">
			</form>
		</div>
		<div ng-if="!loggedIn" ng-cloak class="uac">
			<span ng-if="!loggedIn" ng-click="signup($event)" class="signup">Sign Up</span>
			<span ng-if="!loggedIn" ng-click="login($event)" class="login">Login</span>
		</div>
		<div ng-if="loggedIn" ng-cloak class="uac">
			<a href="settings" ng-if="loggedIn" ><i class="fa fa-cog"></i>{{username}}</a>
			<a href="#" ng-click="logout()"><i class="fa fa-sign-out"></i></a>
		</div>
	</div>
	<ng-view></ng-view>

	<script type="text/javascript" src="<?php echo base_url(); ?>components/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>components/angular/angular.min.js"></script>

	<script type="text/javascript" src="<?php echo base_url(); ?>components/angular-aria/angular-aria.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>components/angular-animate/angular-animate.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>components/angular-material/angular-material.min.js"></script>

	<script type="text/javascript" src="<?php echo base_url(); ?>components/angular-route/angular-route.min.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/config.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/Ctrl.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/services.js"></script>
</body>
</html>
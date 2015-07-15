<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html lang="en" data-ng-app="scroll" ng-controller="mainCtrl">
<head>
	<meta charset="utf-8">
	<link rel="icon" type="image/png" href="http://techkriti.org/img/favicon.ico">
	<title>Explore | Techkriti</title>
	<meta name="description" content="Explore Techkriti">
	<meta name="fragment" content="!">
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>components/angular-material/angular-material.min.css">
	<link rel="stylesheet" type="text/css" href="<?php echo base_url() ?>css/style.css">
	<base href="<?php echo base_url() ?>" />
</head>
<body>
	<div class="topbar-wrap">
		<div class="topbar">
			<a href="<?php echo base_url() ?>" class="brand">Explore</a>
			<div ng-if="!loggedIn" ng-cloak class="uac">
				<div class="uac-in">
					<span ng-if="!loggedIn" ng-click="signup($event)" class="signup">Sign Up</span>
					<span ng-if="!loggedIn" ng-click="login($event)" class="login">Login</span>
				</div>
			</div>
			<div ng-if="loggedIn" ng-cloak class="uac">
				<div ng-show="login" class="userSettingsWrap saharan-dropdown display-none">
					<a href="#" class="set userloggedin">{{userinfo.name | first_name}}</a>
					<div class="userActions">
						<div class="arrow-up"></div>
						<div class="arrow-up-bg"></div>
						<div class="userActionInner">
							<a href="users/{{userinfo.username}}">Your profile</a>
							<a href="settings/topics">Topics</a>
							<a href="settings/profile">Settings</a>
							<a href="./" ng-click="logout()">Log out</a>
						</div>
					</div>
				</div>
			</div>
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
	<script type="text/javascript" src="<?php echo base_url(); ?>js/directives.js"></script>
	<script type="text/javascript" src="<?php echo base_url(); ?>js/filters.js"></script>
</body>
</html>
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	function count_visit(){
		$CI=&get_instance();

		if(empty($CI->input->cookie('skill_user'))||empty($CI->input->cookie('skill_token'))){
			return false;
		}
		$user_id=$CI->input->cookie('skill_user');
		$login_key=$CI->input->cookie('skill_token');

		$credentials=array('user_id'=>$user_id,'token'=>$login_key,'valid'=>1);
		$CI->db->select('valid');
		$CI->db->where($credentials);
		$loginCheck=$CI->db->count_all_results('login');
		if($loginCheck==1){
			return true;
		}
		return false;
	}
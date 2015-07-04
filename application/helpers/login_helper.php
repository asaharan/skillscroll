<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	function isloggedin(){
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

	function login($username,$p1){
		$CI=&get_instance();
		if(empty($username)){
			return false;
		}
		$login=match_password($username,$p1);
		if(!$login){
			return false;
		}
		$user=usernametoid($username);
		$credentials=array(
			'name'=>'user',
			'value'=>$user,
			 'expire' => '2592000',
			  'prefix' => 'skill_'
		);
		$CI->load->helper('cookie');
		$CI->input->set_cookie($credentials);

		$token=generateRandomString(40);
		$tokeS=array('user_id'=>$user,'token'=>$token);
		$CI->db->insert('login',$tokeS);

		$credentials['name']='token';
		$credentials['value']=$token;
		$CI->input->set_cookie($credentials);

		return true;
	}

	function logout(){
		$CI=&get_instance();
		$token=$CI->input->cookie('skill_token');
		$user_id=$CI->input->cookie('skill_user');

		$CI->input->set_cookie(array('name'=>'skill_user','value'=>0));
		$CI->input->set_cookie(array('name'=>'skill_token','value'=>0));
		if(empty($token)||empty($user_id)){
			return false;
		}
		$credentials=array('user_id'=>$user_id,'token'=>$token);
		$toupdate['valid']=0;
		$CI->db->where($credentials)->update('login',$toupdate);
		return true;
	}

	function match_password($username,$p1,$id=0){
		$CI=&get_instance();
		if(empty($username)){
			return false;
		}
		$given='username';

		if($id==1){
			$given='id';
		}

		$password_hash=$CI->db->select('password')->where($given,$username)->get('users');
		if($CI->db->affected_rows()!=1){
			return false;
		}
		$password_hash=$password_hash->row()->password;

		return password_verify($p1,$password_hash);
	}

	function signup($username,$name,$phone,$fb){
		$CI=&get_instance();

		if(empty($username)||empty($name)){
			return false;
		}

		if ((strpos($username,'@') !== false)) {
			return false;   
		}

		$CI->db->where('username',$username);
		if($CI->db->count_all_results('users')==1){
			return false;
		}
		$signuptoken=generateRandomString();
		// echo $signuptoken;

		// $salt=generateRandomString(24);

		// $password=password_hash($signuptoken,PASSWORD_BCRYPT,array('salt'=>$salt));
		$password=hash_password($signuptoken);
		$credentials=array('username'=>$username,'email'=>$username.'@iitk.ac.in','password'=>$password,'name'=>$name,'phone'=>$phone,'facebook'=>$fb);
		$CI->db->insert('users',$credentials);
		
		if($CI->db->affected_rows()!=1){
			return false;
		}

		sendmail($username,'signup',$name,$signuptoken);

		return true;
	}


	function sendmail($username,$topic,$name,$token=''){
		$CI=&get_instance();
		$CI->load->library('email');
		$msg="Welcome $name \n";

		if($topic=='signup'){
			$CI->email->from('skillscroll@iitk.ac.in','SkillScroll');
			$CI->email->to($username.'@iitk.ac.in'); 
			$CI->email->subject('Welcome to SkillScroll');
			$msg.="Your password for SkillScroll IITK is\n$token\nVisit SkillScroll at ".base_url();
			$CI->email->message($msg);
			$CI->email->send();
		}
	}

	function generateRandomString($length = 10) {
	    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZSkillScrollAmitSaharan';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}

	function userid(){
		$CI=&get_instance();
		if(empty($CI->input->cookie('skill_user'))){
			return false;
		}

		return $CI->input->cookie('skill_user');
	}

	function usernametoid($username){
		$CI=&get_instance();

		$result=$CI->db->select('id')->where('username',$username)->get('users');
		if(empty($result)){
			return false;
		}

		return $result->row()->id;
	}

	function userinfo($user_id){
		$CI=&get_instance();
		if(empty($user_id)){
			return false;
		}

		$result=$CI->db->select('id,username,about,alternate_email,name,email,phone,facebook,address')->get_where('users',array('id'=>$user_id));
		if($result->num_rows()!=1){
			// echo $result->num_rows().$user_id;
			return false;
		}

		return $result->row();
	}
	function updatepassword($user_id,$old_pass,$new_pass){
		$CI=&get_instance();
		if(!match_password($user_id,$old_pass,1)){
			return false;
		}
		$password=hash_password($new_pass);

		$credentials=array('password'=>$password);

		$CI->db->where('id',$user_id)->update('users',$credentials);
		return true;
	}

	function hash_password($pass){
		$salt=generateRandomString(24);
		return password_hash($pass,PASSWORD_BCRYPT,array('salt'=>$salt));
	}
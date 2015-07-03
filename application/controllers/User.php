<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{	
		$response=[];
		$response['login']=false;
		echo json_encode($response);
	}
	public function isloggedin(){
		$this->load->helper('login');
		$response['login']=isloggedin();
		echo json_encode($response);
	}

	public function login(){
		$response=[];
		$response['login']=false;
		$this->load->helper('login');
		// $reply=login('a','2hfkk2fPJj');
		// echo json_encode(login('vijay','msQkrSyncV'));

		$reply=login($this->input->post('username'),$this->input->post('password'));
		$response['login']=$reply;
		echo json_encode($response);
	} 
	public function signup(){
		$this->load->helper('login');
		$response['status']=false;
		$username=$this->input->post('username');
		$name=$this->input->post('name');
		if(empty($username)||empty($name)){
			$response['reason']='Must fill username ans Name';
			echo json_encode($response);
			die();
		}
		$phone='';
		if(!empty($this->input->post('phone'))){
			$phone=$this->input->post('phone');
		}
		$fb='';
		if(!empty($this->input->post('facebook'))){
			$fb=$this->input->post('facebook');
		}

		$response['status']=signup($username,$name,$phone,$fb);
		echo json_encode($response);
	}

	public function info(){
		$response=[];
		$response['login']=false;
		$this->load->helper('login');
		if(!isloggedin()){
			echo json_encode($response);
			die();
		}

		$user_id=userid();
		$response['info']=userinfo($user_id);
		if($response['info']!==false){
			$response['login']=true;
		}
		echo json_encode($response);
	}
	public function logout(){
		$this->load->helper('login');
		logout();
	}
	public function topics(){
		$this->load->helper('login');
		$response['login']=false;
		if(!isloggedin()){
			die(json_encode($response));
		}
		$response['login']=true;
		$this->load->helper('update');

		$user_id=userid();

		$response['topics']=fetch_topics($user_id);
		echo json_encode($response);
	}
}

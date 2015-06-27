<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Update extends CI_Controller {

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
	public function profile(){
		$response=[];
		$response['login']=false;
		$this->load->helper('login');
		if(!isloggedin()){
			die(json_encode($response));
		}
		$user_id=userid();
		$this->load->helper('update');
		$name=$this->input->post('name');
		$phone=$this->input->post('phone');
		$facebook=$this->input->post('facebook');
		$address=$this->input->post('address');

		profile($user_id,$name,$phone,$facebook,$address);

	}

	public function deleteTopic(){
		$response['login']=false;
		$this->load->helper('login');
		if(!isloggedin()){
			die(json_encode($response));
		}
		$response['login']=true;
		$user_id=userid();
		$id=$this->input->post('iid');
		$this->load->helper('update');
		deleteTopic($user_id,$id);
	}

	public function addTopic(){
		$response['login']=false;
		$this->load->helper('login');
		if(!isloggedin()){
			die(json_encode($response));
		}
		$user_id=userid();
		$response['login']=true;


		if(empty($this->input->post('topic')) || empty($this->input->post('level'))){
			$response['status']=false;
			die(json_encode($response));
		}
		$topic=$this->input->post('topic');
		$level=$this->input->post('level');
		$this->load->helper('update');

		$description='';
		if(!empty($this->input->post('description'))){
			$description=$this->input->post('description');
		}
		$link='';
		if(!empty($this->input->post('link'))){
			$link=$this->input->post('link');
		}

		addUserTopic($user_id,$topic,$level,$description,$link);
	}
}

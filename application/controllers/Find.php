<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Find extends CI_Controller {

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
		$topic1=array('topic'=>'MYSQL','level'=>2);
		$topic2=array('topic'=>'Robotics','level'=>4);

		$topics=array($topic1,$topic2);
		$amit=array('name'=>'amit','topics'=>$topics);

		for ($i=0; $i <10 ; $i++) { 
			$response[$i]=$amit;	
		}
		echo json_encode($response);
	}
	public function hot(){
		$this->db->select('topics.topic,topics.id');
		$this->db->join('topics','topics.id=user_topics.topic_id')->group_by('topic_id')->limit(10)->order_by('COUNT(user_topics.topic_id) desc');
		$topics=$this->db->get('user_topics');

		$response['topics']=[];
		foreach ($topics->result() as $topic) {
			array_push($response['topics'],(array)$topic);
		}
		echo json_encode($response);
	}
	public function mayknow(){
		$this->db->select('username,name')->limit(10);
		$people=$this->db->get('users');
		$response['people']=[];
		foreach ($people->result() as $person) {
			array_push($response['people'], (array)$person);
		}

		echo json_encode($response);
	}
	public function havingTopic(){

		$response['status']=false;
		if(empty($this->input->post('id'))){
			$response['status']=false;
			die(json_encode($response));
		}
		$response['status']=true;
		$topic_id=$this->input->post('id');

		$this->db->select('users.name,users.username,user_topics.description,user_topics.link,user_topics.level');
		$this->db->join('users','user_topics.user_id=users.id','left')->where(array('user_topics.topic_id'=>$topic_id));
		$result=$this->db->get('user_topics');
		$response['people']=[];
		foreach ($result->result() as $person) {
			array_push($response['people'],(array)$person);
		}
		$result=$this->db->get_where('topics',array('id'=>$topic_id))->row();
		if(!empty($result)){
			$response['topic']=$result->topic;
		}else{
			$response['status']=false;
		}

		echo json_encode($response);
	}
	public function relatedtopics(){
		$response['status']=false;
		if(empty($this->input->post('id'))){
			$response['status']=false;
			die(json_encode($response));
		}
		$response['status']=true;
		$topic_id=$this->input->post('id');

		$this->db->select('topics.id,topics.topic');
	}

	public function userinfo(){



		$response['status']=false;
		if(empty($this->input->post('username'))){
			$response['status']=false;
			die(json_encode($response));
		}
		$username=$this->input->post('username');

		$this->load->helper('login');
		$user_id=usernametoid($username);
		if($user_id==false){
			die(json_encode($response));
		}
		$response['status']=true;
		$response['info']=userinfo($user_id);
		$this->load->helper('update');
		$response['topics']=fetch_topics($user_id);
		echo json_encode($response);
	}
}

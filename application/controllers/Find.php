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
		$this->db->join('topics','topics.id=user_topics.topic_id')->group_by('topic_id')->limit(10)->order_by('COUNT(user_topics.topic_id)');
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
}

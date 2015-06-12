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
}

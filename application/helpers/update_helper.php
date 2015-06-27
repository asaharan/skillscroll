<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	function profile($user_id,$name="",$phone='',$facebook='',$address=''){
		$CI=&get_instance();

		$crede=array(
			'name'=>$name,
			'phone'=>$phone,
			'facebook'=>$facebook,
			'address'=>$address
		);
		$CI->db->where('id',$user_id)->update('users',$crede);

		return false;
	}
	function fetch_topics($user_id){
		$CI=&get_instance();
		$CI->db->select('user_topics.id as iid,topics.id,topics.topic,user_topics.description,user_topics.link,user_topics.level');
		$CI->db->join('topics','topics.id=user_topics.topic_id')->where('user_id',$user_id);
		$topics=$CI->db->get('user_topics');
		$toreturn=[];
		foreach ($topics->result() as $topic) {
			array_push($toreturn, (array)$topic);
		}
		return $toreturn;
	}
	function deleteTopic($user_id,$iid){
		$CI=&get_instance();
		$crede=array('user_id'=>$user_id,'id'=>$iid);
		$CI->db->where($crede)->delete('user_topics');
		echo $CI->db->affected_rows().$user_id;
	}


	//will return false if not able to add
	function addUserTopic($user_id,$topic,$level=0,$description='',$link=''){
		$CI=&get_instance();
		$topic_id=getTopicId($topic);
		if($topic_id==false){
			$topic_id=addTopic($topic);
		}
		$crede=array('user_id'=>$user_id,'topic_id'=>$topic_id,'description'=>$description,'link'=>$link,'level'=>$level);
		$CI->db->insert('user_topics',$crede);

		if($CI->db->affected_rows()!=1){
			return false;
		}

		return true;
	}
	//will return false if topic does not exist
	function getTopicId($topic){
		$CI=&get_instance();
		$CI->db->select('id')->where('topic',$topic);
		$result=$CI->db->get('topics');
		if($result->num_rows()!=1){
			return false;
		}

		return $result->row()->id;
	}

	//will add topic to topics table and return insert_id
	function addTopic($topic){
		$CI=&get_instance();
		$crede=array('topic'=>$topic);
		$CI->db->insert('topics',$crede);
		return $CI->db->insert_id();
	}
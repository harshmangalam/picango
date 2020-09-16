import React,{useContext,useState} from "react";
import {UserContext,MessageContext} from "../../App"
import {Row,Col,Container,Image,Button,Spinner} from "react-bootstrap"
import axios from "axios"

const ENDPOINT = "https://picango.herokuapp.com/api"

const FollowUnfollow = ({user}) => {

	const {userState,userDispatch} = useContext(UserContext)
	const {messageDispatch} = useContext(MessageContext)

	const [loading,setLoading] = useState(false)
	const isFollowing =  () => {
		let follow = false;
		 user.followersData.map((u) => {
			if (u.id === userState.currentUser.id) {
				follow = true;
			}
		});

		return follow;
	}
	const Action = async (action,user_id)=>{
		try{
			setLoading(true)
			const response = await axios.get(
				`${ENDPOINT}/user/${user_id}/${action}`,
				{
					headers: {
						Authorization: `Bearer ${
							window.localStorage.token &&
							JSON.parse(window.localStorage.token)
						}`,
					},
				}
			);
			const current_user = await axios.get(`${ENDPOINT}/user/${userState.currentUser.id}`)
			userDispatch({type:"LOAD_CURRENT_USER",payload:current_user.data.user})
			userDispatch({type:"UPDATE_USER",payload:current_user.data.user})
			messageDispatch({type:"MESSAGE",payload:{message:response.data.message,variant:"success"}})
			const user = await axios.get(`${ENDPOINT}/user/${user_id}`)
			userDispatch({type:"UPDATE_USER",payload:user.data.user})
			
		}catch(err){
			
			
				if(err.response.status === 500){
					console.log(err.response.data)
				}
			
				else{
					if(err.response.data.error){
					messageDispatch({type:"MESSAGE",payload:{message:err.response.data.error,variant:"danger"}})
				}
				if(err.response.data.general){
					messageDispatch({type:"MESSAGE",payload:{message:err.response.data.general,variant:"danger"}})
				}
				}
			
		}

		setLoading(false)
	}
	return (
		<React.Fragment>
			{userState && userState.currentUser && userState.currentUser.id !== user.id && isFollowing() ? (
				<Button variant="danger" size="sm" onClick={() => Action("unfollow",user.id)}>{loading ?  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />  : "Unfollow"}</Button>
			) : null}

			{userState && userState.currentUser && userState.currentUser.id !== user.id && !isFollowing() ? (
				<Button variant="success" size="sm" onClick={() => Action("follow",user.id)} size="sm">
					{loading ?  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />  : "Follow"}
				</Button>
			) : null}
		</React.Fragment>
	);
};

export default FollowUnfollow;

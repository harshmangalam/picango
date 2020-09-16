import React, { useContext, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PostContext, UserContext, MessageContext } from "../../App";
import {
	
	
	Button,
	
	
} from "react-bootstrap";

const ENDPOINT = "https://picango.herokuapp.com/api";

const PostSettings = ({ postId }) => {

	const history = useHistory();
	const { postDispatch } = useContext(PostContext);
	

	const { userState, userDispatch } = useContext(UserContext);
	const { messageDispatch } = useContext(MessageContext);
	const [loading,setLoading] = useState(false)

	const deletePost = async (e) => {
		setLoading(true)

		e.preventDefault();
		
		try {
			const response = await axios.delete(`${ENDPOINT}/post/${postId}`, {
				headers: {
					Authorization: `Bearer ${JSON.parse(
						window.localStorage.token
					)}`,
				},
			});
			const user = await axios.get(
				`${ENDPOINT}/user/${userState.currentUser.id}`
			);
			postDispatch({ type: "DELETE_POST", payload: postId });
			userDispatch({
				type: "LOAD_CURRENT_USER",
				payload: user.data.user,
			});
			userDispatch({ type: "UPDATE_USER", payload: user.data.user });

			messageDispatch({
				type: "MESSAGE",
				payload: { message: response.data.message, variant: "success" },
			});
			history.push("/");
		} catch (error) {
			if (error.response.status === 500) {
				console.log(error.response.data);
			} else {
				if (error.response.data.general) {
					messageDispatch({
						type: "MESSAGE",
						payload: {
							variant: "danger",
							message: error.response.data.general,
						},
					});
				}
				if (error && error.response.data.error) {
					messageDispatch({type: "MESSAGE",payload: {
							variant: "success",
							message: error.response.data.error,
						}})
				}
			}
		}
		setLoading(false)
	};

	return (
		<Button className="p-2" variant="light" onClick={(e) => deletePost(e)}>
			{loading ? "deleting..." : <span className="material-icons text-danger">delete</span>}
		</Button>
	);
};

export default PostSettings;

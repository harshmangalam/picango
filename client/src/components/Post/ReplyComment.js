import React,{useContext,useState} from "react"
import {ListGroup,Button,Form,Image} from "react-bootstrap"
import {UserContext,PostContext} from "../../App"
import axios from "axios"

const ENDPOINT = "https://picango.herokuapp.com/api"

const ReplyComment = ({comment,setLoading,setMessage}) => {

	const {userState} = useContext(UserContext)
	const {postDispatch} = useContext(PostContext)
	const [text,setText] = useState("")
	const replyComment = async (e) => {
		e.preventDefault()
		try{
			setLoading(true)
		const response = await axios.post(`${ENDPOINT}/post/comment/${comment.id}/reply/${userState.currentUser.id}`,{body:text}, {
				headers: {
					Authorization: `Bearer ${
						window.localStorage.token &&
						JSON.parse(window.localStorage.token)
						}`,
				},
			})
		setText("")
		setMessage({message:response.data.message,variant:"success"})
		const commentData = await axios.get(`${ENDPOINT}/post/comment/${comment.id}`)
			postDispatch({type:"UPDATE_COMMENT",payload:commentData.data.comment})
			setLoading(false)
		}catch(err){
			setLoading(false)
			console.log(err)
			if(err){
				if(err.response.data.general){
				setMessage({message:err.response.data.general,variant:"danger"})
			}
			if(err.response.data.error){
				setMessage({message:err.response.data.error,variant:"danger"})
			}
			}
		}
	}

		return (
			<div>
				<ListGroup variant="flush border" className="my-3">
					{comment && comment.replyData && comment.replyData.map((reply,n)=>(
						<ListGroup.Item style={{marginLeft:`${n*10}px`}}>
						{comment && comment.user.profile_pic && <span><Image src={reply.user.profile_pic} style={{width:40,height:40,borderRadius:'100%'}} /></span>}
						<span>{reply.user.profile_pic && <span><img src={reply.user.profile_pic} style={{width:"30px",height:"30px",borderRadius:"100%"}} /></span>}</span>
						<span  className="mx-3">
						{reply.user.name}
						</span>
						<div className="my-2 mx-3">

							<small>{reply.replyBody}</small>
						</div>
						</ListGroup.Item>
						))}
				</ListGroup>

				<Form className="my-2">
					<Form.Group>
					<Form.Control as="textarea" value={text} onChange={e=>setText(e.target.value)}>
					</Form.Control>
					</Form.Group>
					<Button onClick={replyComment} className="my-2">Reply</Button>
				</Form>
			</div>
			)
}

export default ReplyComment
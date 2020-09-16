import React,{useContext} from "react"
import {Row,Col,Container,Card,Button} from "react-bootstrap"
import {PostContext} from "../../App"

import Post from "./Post"
const Posts = () => {
	const {postState,postDispatch} = useContext(PostContext)
	

	return (
		<div>
			<Row>
			
			{postState.posts.length ? postState.posts.map((post)=>(
				<Col  key={post.id} sm={12} xs={12} md={12}>
					<Post post={post}/>
				</Col>

				)) :null}
			</Row>
		</div>
		)
}

export default Posts
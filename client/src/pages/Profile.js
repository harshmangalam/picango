import React,{useContext} from "react"
import {Container,Row,Col} from "react-bootstrap"
import Dashboard from "../components/User/Dashboard"
import ProfileCard from "../components/User/ProfileCard"
import {useParams} from "react-router-dom"
import {UserContext,PostContext} from "../App"
import {GetUserProfile,GetUserPosts} from "../utils/users"
const Profile = () => {
	const {userId} = useParams()
	const {userState} = useContext(UserContext)
	const {postState} = useContext(PostContext)
	const getUserProfile = GetUserProfile(userState,userId)
	const getUserPosts = GetUserPosts(postState,userId)

	return (
		<div>
		<Row>
			<Col sm={12} xs={12} md={12}>
				<ProfileCard user={getUserProfile} posts={getUserPosts} />
			</Col>
		</Row>


		<Row className="my-4">
			<Col sm={12} xs={12} md={12}>
				<Dashboard user={getUserProfile} posts={getUserPosts} />
			</Col>
		</Row>
		</div>
		)
}

export default Profile

import React,{useState,useContext} from "react"
import {UserContext,LoadingContext,MessageContext} from "../../App"
import {Row,Col,Card,Image,Modal,Button,Form,Spinner,InputGroup} from "react-bootstrap"
import axios from "axios"
import Resizer from "react-image-file-resizer"
const ENDPOINT = "https://picango.herokuapp.com/api"

const EditProfile = () => {
	const {userState,userDispatch} = useContext(UserContext)
	const {messageDispatch} = useContext(MessageContext)

	const [showModal,setShowModal] = useState(false)
	const [profilePic,setProfilePic] = useState("")
	const [email,setEmail] = useState("")
	const [name,setName] = useState("")
	const [loading,setLoading] = useState(false)
	const [base64Image,setBase64Image] = useState("")






	const openProfileModal = () => {
		setShowModal(true)
		const {name,email,profile_pic} = userState.currentUser
		setName(name)

		setEmail(email)
		
	}

	const handleChangeProfile = (e) => {
		Resizer.imageFileResizer(e.target.files[0],200,200,'PNG',70,0,uri=>{
			setProfilePic(uri)
			const reader = new FileReader()
			reader.onload = () => {
				setBase64Image(reader.result)
			}
			reader.readAsDataURL(uri)
		},'blob')
		
	}
	const updateProfile = async (event) => {
		event.preventDefault()
		setLoading(true)
		const data = new FormData();
		
		data.append("name", name);
		data.append("email", email);
		if(profilePic){

			data.append("profile_pic",profilePic)
		}
		try {
		const response = await axios.post(`${ENDPOINT}/user/profile`, data, {
				headers: {
					Authorization: `Bearer ${
						window.localStorage.token &&
						JSON.parse(window.localStorage.token)
						}`,
				},
			})
			messageDispatch({
					type: "MESSAGE",
					payload: { message: response.data.message, variant: "success" },
				});
			const userData = await axios.get(`${ENDPOINT}/user/${userState.currentUser.id}`)
			userDispatch({ type: "LOAD_CURRENT_USER", payload: userData.data.user })
			userDispatch({ type: "UPDATE_USER", payload: userData.data.user })

		}catch(err){
				
					if(err.response.status === 500){
						console.log(err.response.data)
					}
					if (err.response.data.general) {
						messageDispatch({message:err.response.data.general,variant:"danger"});
					}
					if (err.response.data.error) {
						messageDispatch({message:err.response.data.error,variant:"danger"});
					}
			}

		setLoading(false)
		setShowModal(false)
			
	}
	return (
		<>
			<Button onClick={()=>openProfileModal()} size="sm" variant="outline-warning"><span className="material-icons">create</span></Button>
			<Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
				<Modal.Title>Update Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
					<div className="text-center my-3">
						{base64Image ? <Image width="200" height="200" thumbnail src={base64Image}/> : userState.currentUser.profile_pic ? <Image width="200" height="200" thumbnail src={userState.currentUser.profile_pic}/> :null }
					</div>
					<Form.File id="upload" custom className="my-2">
									<Form.File.Input
										name="profile_pic"

										onChange={(e) =>handleChangeProfile(e)
										}
										
									/>
									<Form.File.Label data-browse="Pic">
										<span className="material-icons">face</span>
									</Form.File.Label>
								</Form.File>
								
						<Form.Group>
						<InputGroup>
						<InputGroup.Prepend>
						<InputGroup.Text>
							<span className="material-icons">account_circle</span>
						</InputGroup.Text>
						</InputGroup.Prepend>
							<Form.Control type="text" value={name} onChange={e=>setName(e.target.value)} />
						</InputGroup>
						</Form.Group>

						<Form.Group>
						<InputGroup>
						<InputGroup.Prepend>
						<InputGroup.Text>
							<span className="material-icons">mail</span>
						</InputGroup.Text>
						</InputGroup.Prepend>
							<Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
						</InputGroup>
						</Form.Group>
						
					</Form>

				</Modal.Body>
				<Modal.Footer>
					<Button variant="info" size="sm" onClick={updateProfile} className="btn-block">
	{loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Update"}

					</Button>
				</Modal.Footer>
			</Modal>
		</>
		)
}

export default EditProfile
import React, { useContext,useState } from "react";
import { Col, Row, Container, Form, Button, Alert,Spinner,InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {SignupUser,loadUserById} from "../Api"
import { UserContext, MessageContext } from "../App"
const Signup = () => {
	const {userDispatch } = useContext(UserContext)
	const { messageDispatch } = useContext(MessageContext)
	const history = useHistory();
	const [signupData,setSignupData] = useState({name:"",email:"",password:""})
	const [validated, setValidated] = useState(null);
	const [passError, setPassError] = useState(null);
	const [nameError, setNameError] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [general, setGeneral] = useState(null);
	const [loading,setLoading] = useState(false)

	const signupUser = async (e) => {
		setLoading(true)
			e.preventDefault()
			setPassError(false)
			setNameError(false)
			setEmailError(false)
			setGeneral(false)
			setValidated(null)

			const {message,error,userId} = await SignupUser(signupData)
			if(userId){
				const {user,error} =await loadUserById(userId)
				if(user){
					userDispatch({type:"ADD_USER",payload:user})
					 messageDispatch({ type: "MESSAGE", payload: { message: message, variant: "success" } })
					 history.push("/login")
				}
				if(error){
					console.log("error")
				}
			}
		if(error){
			if (error.response.data.general) {
					setGeneral(error.response.data.general);
				}
				if (error.response.data.error) {
					error.response.data.error.map((e) => {
						if (e.param == "name") {
							setNameError(e.msg);
						}
						if (e.param == "password") {
							setPassError(e.msg);
						}
						if (e.param == "email") {
							setEmailError(e.msg);
						}
					});
				}
		}

			setLoading(false)
			}

	return (
		<Row>
			<Col xs={12} md={{ span: 6, offset: 3 }}>
				<Form
					className="border"
					noValidate
					validated={validated}
					onSubmit={signupUser}
				>
					<h3 className="text-center my-4">Create Account</h3>
					<Container>
						{general && <Alert variant="danger">{general}</Alert>}
						<Form.Group controlId="signupName">
							
							<InputGroup>
							<InputGroup.Prepend>
							<InputGroup.Text><span className="material-icons">account_circle</span></InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								isInvalid={nameError}
								type="text"
								placeholder="Name"
								value={signupData.name}
								onChange={(e) => setSignupData({...signupData,name:e.target.value})}
							/>
							</InputGroup>
							{nameError && (
								<Form.Control.Feedback type="invalid">
									{nameError}
								</Form.Control.Feedback>
							)}
						</Form.Group>
						<Form.Group controlId="signupEmail">
							
							<InputGroup>
							<InputGroup.Prepend>
							<InputGroup.Text><span className="material-icons">mail</span></InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								isInvalid={emailError}
								type="email"
								placeholder="Enter email"
								value={signupData.email}
								onChange={(e) => setSignupData({...signupData,email:e.target.value})}
							/>
							</InputGroup>
							{emailError && (
								<Form.Control.Feedback type="invalid">
									{emailError}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						<Form.Group controlId="signupPassword">

							
							<InputGroup>
							<InputGroup.Prepend>
							<InputGroup.Text><span className="material-icons">lock</span></InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								isInvalid={passError}
								type="password"
								placeholder="Password"
								value={signupData.password}
								onChange={(e) => setSignupData({...signupData,password:e.target.value})}
							/>
							</InputGroup>
							{passError && (
								<Form.Control.Feedback type="invalid">
									{passError}
								</Form.Control.Feedback>
							)}
						</Form.Group>
						<Button
							disabled={loading}
							className="mb-3 btn-block"
							variant="primary"
							type="submit"
						>
							{loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />  : "Signup"}
						</Button>
					</Container>
				</Form>
				<div className="border text-center my-3">
					<div className="my-3">
						Already have an account ? &nbsp;
						<Link to="/login">Login</Link>
						
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Signup;

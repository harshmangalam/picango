import React, { useEffect, useState, useContext } from "react";
import { Col, Alert, Row, Container, Form, Button,Spinner,InputGroup } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
	UserContext,
	MessageContext,
	LoadingContext,
	PostContext,
} from "../App";

const ENDPOINT = "https://picango.herokuapp.com/api";
const Login = () => {
	const { userState, userDispatch } = useContext(UserContext);
	const { postDispatch } = useContext(PostContext);

	const { messageDispatch } = useContext(MessageContext);
	const { loadingState, loadingDispatch } = useContext(LoadingContext);

	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [validated, setValidated] = useState(null);
	const [loginError, setLoginError] = useState({});
	const [loading, setLoading] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [passError, setPassError] = useState(false);

	const loginUser = async (e) => {
		e.preventDefault();
		setLoading(true);

		const loginData = { email, password };
		try {
			const response = await axios.post(
				`${ENDPOINT}/auth/login`,
				loginData
			);
			const user = await axios.get(
				`${ENDPOINT}/user/${response.data.userId}`
			);
			window.localStorage.setItem(
				"token",
				JSON.stringify(response.data.token)
			);
			window.localStorage.setItem(
				"userId",
				JSON.stringify(response.data.userId)
			);
			userDispatch({
				type: "LOAD_CURRENT_USER",
				payload: user.data.user,
			});
			messageDispatch({
				type: "MESSAGE",
				payload: { message: response.data.message, variant: "success" },
			});
			history.push("/");
		} catch (error) {
			if (error.response.status === 500) {
				setLoginError({
						...loginError,
						general: "server have some issue we will improve within an hour",
					});
			} else {
				if (error.response.data.general) {
					setLoginError({
						...loginError,
						general: error.response.data.general,
					});
				}

				if (error.response.data.error) {
					error.response.data.error.map((e) => {
						if (e.param == "password") {
							setPassError(e.msg);
						}
						if (e.param == "email") {
							setEmailError(e.msg);
						}
					});
				}
			}
		}

		setLoading(false);
	};

	return (
		<Row>
			<Col xs={12} md={{ span: 6, offset: 3 }}>
				<Form
					className="border"
					noValidate
					validated={validated}
					onSubmit={loginUser}
				>
					<h3 className="text-center my-4">Login Account</h3>
					<Container>
						{loginError.general && (
							<Alert variant="danger">{loginError.general}</Alert>
						)}
						<Form.Group controlId="formBasicEmail">
							
							<InputGroup>
							<InputGroup.Prepend>
							<InputGroup.Text><span className="material-icons">account_circle</span></InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								isInvalid={emailError}
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							</InputGroup>
							{emailError && (
								<Form.Control.Feedback type="invalid">
									{emailError}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							
							<InputGroup>
							<InputGroup.Prepend>
							<InputGroup.Text><span className="material-icons">lock</span></InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control
								isInvalid={passError}
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							</InputGroup>
							{passError && (
								<Form.Control.Feedback type="invalid">
									{passError}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						<Button
							className="mb-3 btn-block"
							variant="primary"
							type="submit"
							disabled={loading}
						>
							{loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Login"}
						</Button>
					</Container>
				</Form>
				<div className="border text-center my-3">
					<div className="my-3">
						Not have an account ? &nbsp;
						<Link to="/signup">Signup</Link>
						
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Login;

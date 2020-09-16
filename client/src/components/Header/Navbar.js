import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Navbar,
	Button,
	
	Nav,
	Container,
} from "react-bootstrap";
import Notification from "../User/Notification";
import logo from "../../image/logo.png"
import NavUserProfile from "../User/NavUserProfile";
import { UserContext, MessageContext } from "../../App";

const NavBar = () => {
	const history = useHistory();
	const { userState, userDispatch } = useContext(UserContext);
	const { messageDispatch } = useContext(MessageContext);

	const logoutUser = () => {
		window.localStorage.userId = null;
		window.localStorage.token = null;
		userDispatch({ type: "LOGOUT" });
		messageDispatch({
			type: "MESSAGE",
			payload: { message: "Logout successfully", variant: "success" },
		});
		history.push("/login");
	};
	return (
		<div>
			<Navbar
				className="d-none d-lg-block"
				expand="lg"
				fixed="top"
				style={{ backgroundColor: "#1c92d2" }}
			>
				<Container>
					<Navbar.Brand
						as={Link}
						to="/"
						style={{
							color: "white",
							fontWeight: "bold",
							fontSize: "26px",
						}}
					>
						<img
							src={logo}
							style={{
								borderRadius: "100%",
								border: "2px solid tomato",
							}}
							width="10%"
							height="10%"
						/>
						<span className="mx-3">Picango</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<div className="mr-auto"></div>

						<Nav>
							{userState.currentUser ? (
								<React.Fragment>
									<Nav.Link
										as={Link}
										className="px-2 "
										to="/"
									>
										<Button className="border-white">
											<span className="material-icons text-white">
												home
											</span>
										</Button>
									</Nav.Link>

									<Nav.Link
										as={Link}
										className="px-2 "
										to="/post/create"
									>
										<Button className="border-white">
											<span className="material-icons text-white">
												add
											</span>
										</Button>
									</Nav.Link>

									<Nav.Link
										as={Link}
										to="/users"
										className="px-2"
									>
										<Button className="border-white">
											<span className="material-icons text-white">
												people
											</span>
										</Button>
									</Nav.Link>

									<Nav.Link className="px-2 ">
										<Notification align="bottom" />
									</Nav.Link>

									<Nav.Link className="px-2">
										<Button className="border-white">
											<span
												onClick={logoutUser}
												className="material-icons"
											>
												exit_to_app
											</span>
										</Button>
									</Nav.Link>
									<Nav.Link
										as={Link}
										className="px-2 "
										to="#"
									>
										<NavUserProfile userState={userState} />
									</Nav.Link>
								</React.Fragment>
							) : 
							 (
								<React.Fragment>
									<Nav.Link
										as={Link}
										to="/login"
										className="px-3 text-white border-white"
									>
										<span className="material-icons">
											login
										</span>
									</Nav.Link>

									<Nav.Link
										as={Link}
										to="/signup"
										className="px-3 text-white border-white"
									>
										<span className="material-icons">
											account_circle
										</span>
									</Nav.Link>
								</React.Fragment>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>











			<Navbar
				className="d-lg-none"
				expand="sm"
				fixed="top"
				style={{ backgroundColor: "#1c92d2" }}
			>
				<Container>
					<img
						src={logo}
						style={{
							borderRadius: "100%",
							border: "2px solid tomato",
						}}
						width="15%"
						height="13%"
					/>

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							flex: 1,
							flexWrap: "nowrap",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						{userState.currentUser ? (
							<React.Fragment>
								<div>
									<Nav.Link
										as={Link}
										className=""
										style={{
											fontSize: "26px",
											fontWeight: "bold",
											color: "white",
										}}
										to="/"
									>
										Picango
									</Nav.Link>
								</div>
								<div>
									<Nav.Link className="px-2">
										<Notification align="bottom" />
									</Nav.Link>
								</div>
								<div>
									<Nav.Link
										as={Link}
										className="px-2 "
										to="#"
									>
										<NavUserProfile userState={userState} />
									</Nav.Link>
								</div>
							</React.Fragment>
						) :
						(
						
							<div className="text-center">
								<Nav.Link
									as={Link}
									className=""
									style={{
										color: "white",
										fontSize: "26px",
										fontWeight: "bold",
									}}
									to="/"
								>
									Picango
								</Nav.Link>
							</div>

							
						)}
					</div>
				</Container>
			</Navbar>
		</div>
	);
};

export default NavBar;

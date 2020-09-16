import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {
	Navbar,
	Button,
	
	Nav,
	Container,
	
} from "react-bootstrap";
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
		<Navbar className="d-lg-none" bg="" fixed="bottom" style={{background:"lightgrey"}}>
			<Container>
				<Nav
					style={{
						display: "flex",
						flex: 1,
						flexWrap: "wrap",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{userState.currentUser ? (
						<React.Fragment>
							<Nav.Link as={Link} className="border" to="/">
								<Button className="border-white">
								<span className="material-icons text-white">
									home
								</span>
								</Button>

							</Nav.Link>
							
							<Nav.Link
								as={Link}
								className="border"
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
								className="border"
								to={`/profile/${userState.currentUser.id}`}
							>
								<Button className="border-white">
								<span className="material-icons text-white">
									person_outline
								</span>
								</Button>
							</Nav.Link>
							<Nav.Link
										as={Link}
										to="/users"
										className="mx-3 border"
									>
										<Button>
										<span className="material-icons text-white">
										people	
										</span>
										</Button>
									</Nav.Link>
							<Nav.Link className="border">
								<Button className="border-white">
								<span
									onClick={logoutUser}
									className="material-icons"
								>
									exit_to_app
								</span>
								</Button>
							</Nav.Link>
							
						</React.Fragment>
					) : 
					(
						<React.Fragment>
					<Nav.Link
							as={Link}
							to="/login"
							className="mx-3"
							>
							<Button className="border-white">
								<span className="material-icons  text-white">
									login
								</span>
							</Button>
					</Nav.Link>

					<Nav.Link
									as={Link}
									to="/signup"
									className="mx-3 "
									>
							<Button className="border-white">
										<span className="material-icons text-white">
											account_circle
										</span>
							</Button>
					</Nav.Link>
					</React.Fragment>

					)}
					</Nav>
					</Container>
		</Navbar>
					)
}

export default NavBar;

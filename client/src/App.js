import React, { useReducer, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

// pages

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import UserList from "./pages/UserList";

//component

import Navbar from "./components/Header/Navbar";
import BottomNavBar from "./components/Header/BottomNavBar";

//context
import {
	userReducer,
	postReducer,
	loadingReducer,
	messageReducer,
} from "./context/AppReducer";
import {
	initialUserState,
	initialMessageState,
	initialPostState,
	initialLoadingState,
} from "./context/GlobalState";

//services api

import { fetchAllPosts, loadAllUsers } from "./Api";

export const UserContext = createContext();
export const PostContext = createContext();
export const MessageContext = createContext();
export const LoadingContext = createContext();

const ENDPOINT = "https://picango.herokuapp.com/api";
const App = () => {
	const [userState, userDispatch] = useReducer(userReducer, initialUserState);
	const [postState, postDispatch] = useReducer(postReducer, initialPostState);
	const [loadingState, loadingDispatch] = useReducer(
		loadingReducer,
		initialLoadingState
	);
	const [messageState, messageDispatch] = useReducer(
		messageReducer,
		initialMessageState
	);

	useEffect(() => {
		const fetchCurrentUser = async () => {
			loadingDispatch({ type: "LOADING", payload: true });
			try {
				const userId =
					window.localStorage.userId &&
					JSON.parse(window.localStorage.userId);
				if (userId) {
					const response = await axios.get(
						`${ENDPOINT}/user/${userId}`
					);
					userDispatch({
						type: "LOAD_CURRENT_USER",
						payload: response.data.user,
					});
				}
			} catch (error) {
				if (error.response.status === 500) {
					console.log(error.response.data);
				} else {
					console.log(error);
				}
			}

			loadingDispatch({ type: "LOADING", payload: false });
		};

		fetchCurrentUser();
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			loadingDispatch({ type: "LOADING", payload: true });
			const { posts, error } = await fetchAllPosts();
			if (!error) {
				postDispatch({ type: "LOAD_ALL_POSTS", payload: posts });
			} else {
				console.log("error while fetching all posts :", error);
			}
			loadingDispatch({ type: "LOADING", payload: false });
		};

		fetchPosts();
	}, []);

	useEffect(() => {
		const fetchAllUsers = async () => {
			loadingDispatch({ type: "LOADING", payload: true });
			const { users, error } = await loadAllUsers();
			if (!error) {
				userDispatch({ type: "LOAD_ALL_USERS", payload: users });
			} else {
				console.log("error while getching all users", error);
			}

			loadingDispatch({ type: "LOADING", payload: false });
		};

		fetchAllUsers();
	}, []);
	return (
		<UserContext.Provider value={{ userState, userDispatch }}>
			<PostContext.Provider value={{ postState, postDispatch }}>
				<MessageContext.Provider
					value={{ messageState, messageDispatch }}
				>
					<LoadingContext.Provider
						value={{ loadingState, loadingDispatch }}
					>
						<Router>
							

									{loadingState.loading ? (

										<div style={{display:"flex",flex:1,flexDirection:"row",justifyContent:"center",alignItem:"center",paddingTop:"20%"}}>
											<div><Spinner
												animation="border"
												variant="primary"
											/></div>
											
										</div>

										) :

									(
										<div>
											<Navbar />

										<div
											style={{
												marginTop: "100px",
												marginBottom: "200px",
											}}
										>
									<Container>
									
									{messageState.message ? (
										<Alert
											dismissible
											variant={
												messageState.message.variant
											}
											onClose={() =>
												messageDispatch({
													type: "MESSAGE",
													payload: null,
												})
											}
										>
											{messageState.message.message}
										</Alert>
									) : null}
										<Switch>
										<Route
											exact
											path="/"
											component={Home}
										/>
										<Route
											exact
											path="/login"
											component={Login}
										/>
										<Route
											exact
											path="/signup"
											component={Signup}
										/>
										Route exact path="/user" component=
										{UserList} />
										<Route
											exact
											path="/post/create"
											component={CreatePost}
										/>
										<Route
											exact
											path="/profile/:userId"
											component={Profile}
										/>
										<Route
											exact
											path="/users"
											component={UserList}
										/>
									</Switch>
									
									</Container>
									</div>
							<BottomNavBar />
							</div>
									)
								
						}
						</Router>
					</LoadingContext.Provider>
				</MessageContext.Provider>
			</PostContext.Provider>
		</UserContext.Provider>
	);
};

export default App;

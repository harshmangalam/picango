import {filterPostByDate} from "../Filters"
export const userReducer = (state, action) => {
	switch (action.type) {
		case "LOAD_CURRENT_USER":
			return {
				...state,
				currentUser: action.payload,
			};

		case "ADD_USER":
			return {
				...state,
				users: [...state.users,action.payload],
			};



			case "UPDATE_USER":
			const updatedUsers = state.users.map(user => {
				if(user.id == action.payload.id){
					return action.payload
				}else{
					return user
				}
			})
			return {
				...state,
				users:updatedUsers,
			};
		case "LOGOUT":
			return {
				...state,
				currentUser: null,
			};
		case "LOAD_ALL_USERS":
			return {
				...state,
				users: action.payload
			};
		default :
		return state
	}
};

export const postReducer = (state, action) => {
	switch (action.type) {
		case "LOAD_ALL_POSTS":
		const filteredPosts = filterPostByDate(action.payload)
			return {
				...state,
				posts: filteredPosts,
			};

		case "ADD_POST":
			return {
				...state,
				posts:[...state.posts,action.payload]
			}


		case "DELETE_POST":
		const formatedPost = state.posts.filter(post=>post.id !== action.payload)
			return {
				...state,
				posts:formatedPost
			}

		case "DELETE_COMMENT":
		const formatedComment = state.comments.filter(comment=>comment.id !== action.payload)
			return {
				...state,
				comments:formatedComment
			}


		case "UPDATE_POST":
			const updatedPosts = state.posts.map(post => {
				if(post.id == action.payload.id){
					return action.payload
				}else{
					return post
				}
			})
			return {
				...state,
				posts:updatedPosts
			}

		case "ADD_COMMENT":
			return {
				...state,
				comments:[...state.comments,action.payload]
			}

		case "LOAD_POST_COMMENTS":
			return {
				...state,
				comments:action.payload
			}
			case "UPDATE_COMMENT":
			const updateComments = state.comments.map(comment => {
				if(comment.id == action.payload.id){
					return action.payload
				}else{
					return comment
				}
			})
			return {
				...state,
				comments:updateComments
			}
		default:
			return state
	}
};


export const messageReducer = (state, action) => {
	switch (action.type) {
		
		case "MESSAGE":
			return {
				...state,
				message: action.payload,
			};

		default:
		return state	
	}
};
export const loadingReducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return {
				...state,
				loading: action.payload,
			};

		default:
		 return state
	}
};




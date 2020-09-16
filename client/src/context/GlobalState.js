
export const  initialUserState = {
	currentUser: null,
	users:[],
	
};
export const  initialMessageState = {
	message:null
};
export const  initialLoadingState = {
	loading:false
};
export const  initialPostState = {
	posts:[],
	comments:[],
};




	

	//  const fetchPostById = (post_id) => {
	// 		let postData;
	// 		dispatch({type:"LOADING",payload:true})
	// 		axios
	// 			.get(`http://localhost:4000/api/post/${post_id}`)
	// 			.then((res) => {
	// 				dispatch({type:"LOADING",payload:false})
	// 				postData = res.data.user
	// 			})
	// 			.catch((err) => {
	// 				dispatch({type:"LOADING",payload:false})
	// 				console.log(err);
	// 			});
	// 		return postData
	// 	};

	// 	const loadCurrentUser = () => {
		
	// };



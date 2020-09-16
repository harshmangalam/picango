export const GetUserProfile = (userState,userId) => {
	return userState.users.filter(user=>user.id == userId)[0]
}

export const GetUserPosts = (postState,userId) => {
	return postState.posts.filter(post=>post.user.id == userId)
}
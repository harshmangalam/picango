export const getUserPost = (userId,postState) => {
	return postState.posts.filter(post=>post.user.id ==userId)
}
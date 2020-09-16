export const filterPostByDate = (posts) => {
	return posts.slice().sort((p1,p2)=>(new Date(p2.createdAt) - new Date(p1.createdAt)))
}
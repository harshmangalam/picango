import React,{useState,useContext} from "react"
import {UserContext} from "../../App"
import {Button,Modal,Row,Col,Image} from "react-bootstrap"
import {Link} from "react-router-dom"
const SearchUser = () => {
	const {userState} = useContext(UserContext)
	const [search,setSearch] = useState("")
	const [showModal,setShowModal] = useState(false)
	const [searchResults,setSearchResults] = useState([])


	const searchUser = (e) => {
		e.preventDefault()
		setShowModal(true)
		const users = userState.users.filter(user=>user.name.toLowerCase() == search.toLowerCase())
		setSearchResults(users)

	}
	return (
		<>
			<input  type="text" value={search} onChange={e=>setSearch(e.target.value)} /><Button onClick={searchUser} size="sm" className="mx-2">Search</Button>
			<Modal show={showModal} onHide={()=>setShowModal(false)} size="lg" centered>
				<Modal.Header cloaseButton>
					<Modal.Title>your search results</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
					{searchResults.length > 0 ? searchResults.map(user=>(
					<React.Fragment key={user.id}>
						<Col md={3}>

						{user.profile_pic && (
							<Image
								thumbnail
								roundedCircle
								width="80px"
								
								src={user.profile_pic}
							/>
							
						)}

					</Col>
					<Col md={5}>
					<div className="text-left">
						<div>{user.name}</div>
						<div className="text-muted"><small>{user.email}</small></div>
					</div>
					</Col>
					<Col md={4}>
						<Button onClick={()=>setShowModal(false)} as={Link} to={`/profile/${user.id}`} size="sm">view profile</Button>
					</Col>
					</React.Fragment>
						)): null}
				</Row>
					</Modal.Body>
			</Modal>

		</>
		)
}

export default SearchUser
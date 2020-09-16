import React,{useState,useEffect} from "react"
import {Map,Marker,Popup,TileLayer} from "react-leaflet"
import {Badge} from "react-bootstrap"


const PostLocation = ({coords,user}) => {
	
	
	return (
		<>
		<Map center={[coords.lat,coords.lon]} zoom={10} style={{width:"100%",height:"300px"}}>
				<TileLayer
					attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={[coords.lat,coords.lon]}>
					<Popup>
						<div style={{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"}}>
						{user.profile_pic && <div><img src={user.profile_pic} width="30px" height="30px" /></div>}
						<div>{user.name}</div>
						<div>{user.email}</div>
						</div>
					</Popup>
				</Marker>
			</Map>


		</>
		)
}


export default PostLocation
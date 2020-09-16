import React,{useRef,useState,useContext} from "react"
import {Button,Overlay,Popover,Badge} from "react-bootstrap"
import axios from "axios"
import {UserContext} from "../../App"
const ENDPOINT = "https://picango.herokuapp.com/api"
const Notification = ({align}) => {

  const {userState,userDispatch} = useContext(UserContext)
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [loading,setLoading] = useState(false)

  const ref = useRef(null);

  const removeNotif = async (e) => {
    e.preventDefault()
    setLoading(true)
      try{
        await axios.delete(`${ENDPOINT}/user/notification`,{headers:{
                      Authorization:`Bearer ${JSON.parse(window.localStorage.token)}`
                    }})
        const userId = window.localStorage.userId && JSON.parse(window.localStorage.userId)
        const response = await axios.get(`${ENDPOINT}/user/${userId}`)
        userDispatch({type:"LOAD_CURRENT_USER",payload:response.data.user})
      }catch(err){
        console.log(err)
      }

      setLoading(false)
  }

  const handleShowNotification = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  return (
    <div ref={ref}>
      <Button className="border-white" onClick={handleShowNotification}>
      <span className="material-icons text-white">notifications</span>
      <Badge variant="danger">{userState.currentUser && userState.currentUser.notifications > 0 ? userState.currentUser.notifications : null}</Badge>
      </Button>

      <Overlay
        show={show}
        target={target}
        placement={align}
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Notification

          {userState.currentUser && userState.currentUser.notifications > 0 &&  <span className="mx-3"><Button disabled={loading} variant="primary" size="sm" onClick={e=>removeNotif(e)}>{loading ? "clearing..." :"clear"}</Button></span>}
          </Popover.Title>
          {userState.currentUser && userState.currentUser.notifications > 0  ? (
            <Popover.Content>
            <div style={{cursor:"pointer",height:"250px",overflowY:"scroll",overflowX:"hidden"}}>
            {userState.currentUser.notificationsData.map(notif=>(
              <>
              <strong>{notif.msg}</strong>

              <small className="mx-3 my-1 text-muted">{new Date(notif.createdAt).toLocaleString()}</small>
              <br /><hr/></>
              ))}
              </div>
          </Popover.Content>
            ) : "No Notifications"}
        </Popover>
      </Overlay>
    </div>
  );
}

export default Notification
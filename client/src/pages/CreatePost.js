import React, { useContext, useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import {
    Container,
    Row,
    Col,
    
    Button,
    Form,
    Alert,
    Spinner,
} from "react-bootstrap";

import PostLocation from "../components/Post/PostLocation";
import axios from "axios";
import {
    PostContext,
    MessageContext,
    LoadingContext,
    UserContext,
} from "../App";

import { useHistory } from "react-router-dom";
const ENDPOINT = "https://picango.herokuapp.com/api";

const CreatePost = () => {
    const {postDispatch } = useContext(PostContext);
    const { userState} = useContext(UserContext);
    const {messageDispatch } = useContext(MessageContext);

    const history = useHistory();
    const [text, setText] = useState("");
    const [file, setFile] = useState("");
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [base64Image, setBase64Image] = useState("");

    const [showMap, setShowMap] = useState(false);
    const [coords, setCoords] = useState(null);
    const [mapDisabled, setMapDisabled] = useState(false);

    const getCurrentPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapDisabled(false);
                    setCoords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                },
                (error) => {
                    setError(error.message);
                    setMapDisabled(true);
                },
                { timeout: 5000 }
            );
        }
    };

    useEffect(() => {
        getCurrentPosition();
    }, []);

    const handleMapChange = (event) => {
        const value =
            event.target.name === "mymap"
                ? event.target.checked
                : event.target.value;
        setShowMap(value);
    };

    const handlePostImageChange = (e) => {
        Resizer.imageFileResizer(
            e.target.files[0],
            400,
            300,
            "PNG",
            100,
            0,
            (uri) => {
                setFile(uri);
                const reader = new FileReader();
                reader.onload = () => {
                    setBase64Image(reader.result);
                };
                reader.readAsDataURL(uri);
                console.log(file);
            },
            "blob"
        );
    };
    const createPost = async (e) => {
        setLoading(true);
        e.preventDefault();
        setError(null);
        const formdata = new FormData();

        formdata.append("text", text);
        if (file) {
            formdata.append("post_upload", file);
        }

        if (coords) {
            formdata.append("location", JSON.stringify(coords));
        }

        console.log(formdata);
        try {
            const response = await axios.post(`${ENDPOINT}/post`, formdata, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        window.localStorage.token
                    )}`,
                },
            });

            const post = await axios.get(
                `${ENDPOINT}/post/${response.data.postId}`
            );
            postDispatch({ type: "ADD_POST", payload: post.data.post });
            messageDispatch({
                type: "MESSAGE",
                payload: { message: response.data.message, variant: "success" },
            });
            history.push("/");
        } catch (error) {
            setValidated(false);
            if (error.response.status === 500) {
                console.log(error.response.data);
                setError(
                    "there is a problem with server it will be maintained within an hour"
                );
            } else {
                if (error) {
                    if (error.response.data.general) {
                        setError(error.response.data.general);
                    }
                    if (error && error.response.data.error) {
                        setError(error.response.data.error);
                    }
                }
            }
        }
        setLoading(false);
    };
    return (
        <div>
            <Row>
                <Col
                    xs={12}
                    sm={12}
                    md={{ offset: 3, span: 6 }}
                    className="border shadow"
                >
                    <div className="my-4">
                        <Form noValidate validated={validated}>
                            <Container>
                                <h3 className="text-center">Create Post</h3>
                                {error ? (
                                    <Alert variant="danger">{error}</Alert>
                                ) : null}
                                <Form.Group>
                                    <Form.Label>Text</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="4"
                                        value={text}
                                        onChange={(e) =>
                                            setText(e.target.value)
                                        }
                                        placeholder="Enter your text here..."
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className="border p-2">
                                    <input
                                        name="mymap"
                                        type="checkbox"
                                        checked={showMap}
                                        onChange={(e) => handleMapChange(e)}
                                        disabled={mapDisabled}
                                    />
                                    <Form.Label>
                                        Do you want to share your location ??
                                    </Form.Label>
                                    {showMap && (
                                        <PostLocation
                                            page="create"
                                            coords={coords}
                                            user={userState.currentUser}
                                        />
                                    )}
                                </Form.Group>

                                {base64Image && (
                                    <Form.Group>
                                        <Form.Label></Form.Label>
                                        <img
                                            src={base64Image}
                                            width="100%"
                                            height="150px"
                                        />
                                    </Form.Group>
                                )}

                                <Form.File id="upload" custom>
                                    <Form.File.Input
                                        name="post_upload"
                                        accept="image/*"
                                        onChange={(e) =>
                                            handlePostImageChange(e)
                                        }
                                        isValid
                                    />
                                    <Form.File.Label data-browse="Upload">
                                        Upload Image
                                    </Form.File.Label>
                                </Form.File>

                                <Button
                                    disabled={loading}
                                    onClick={createPost}
                                    className="my-3 btn-block"
                                >
                                    {loading ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        "Post"
                                    )}
                                </Button>
                            </Container>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default CreatePost;

import { PostContext } from '../contexts/postContext';
import { AuthContext } from '../contexts/authContext';
import { useContext, useEffect } from 'react';
import SinglePost from '../components/posts/singlePost';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import AddPostModal from '../components/posts/PostButton';
import addIcon from '../assets/plus-circle-fill.svg';
import Toast from 'react-bootstrap/Toast';
import UpdatePostModal from '../components/posts/UpdatePostModal';

const Dashboard = () => {
    // Auth Context
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    // Post Context
    const {
        postState: { posts, postsLoading, post },
        getPosts,
        setAddModal,
        showToast: { show, message, type },
        setShowToast,
    } = useContext(PostContext);

    // Get Post
    useEffect(() => {
        getPosts();
    }, []);

    let body = null;
    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIT</Card.Title>
                        <Card.Text>
                            Click button below to Tracking your Skill
                        </Card.Text>
                        <Button
                            variant="primary"
                            onClick={setAddModal.bind(this, true)}
                        >
                            LearnIt!
                        </Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => {
                        return (
                            <Col key={post._id} className="my-2">
                                <SinglePost post={post} />
                            </Col>
                        );
                    })}
                </Row>
                <Button
                    className="btn-floating"
                    onClick={setAddModal.bind(this, true)}
                >
                    <img src={addIcon} alt="add-post" width="60" height="60" />
                </Button>
            </>
        );
    }
    return (
        <div>
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}
            <Toast
                show={show}
                style={{ position: 'fixed', top: '20%', right: '0%' }}
                className={`bg-${type} text-white text-center`}
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: '',
                    type: null,
                })}
                delay={3000}
                autohide
                animation={false}
            >
                <Toast.Body>
                    <strong>{message}</strong>
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default Dashboard;

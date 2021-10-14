import { Modal, Button, Form } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import { PostContext } from '../../contexts/postContext';

const UpdatePostModal = () => {
    // Context
    const {
        postState: { post },
        showUpdatePost,
        setShowUpdatePost,
        updatePost,
        setShowToast,
    } = useContext(PostContext);

    // state
    const [updatedPost, setUpdatedPost] = useState(post);
    const { title, description, url, status } = updatedPost;

    // Update view
    useEffect(() => {
        setUpdatedPost(post);
    }, [post]);

    // Handle Event
    const onChangeForm = (e) => {
        setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
    };

    const closeDialog = () => {
        setShowUpdatePost(false);
        setUpdatedPost(post);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await updatePost(updatedPost);
        setShowUpdatePost(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
    };
    return (
        <Modal show={showUpdatePost} animation={false} onHide={closeDialog}>
            <Modal.Header>
                <Modal.Title>What do you want to learn?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            require={true.toString()}
                            aria-describedby="title-help"
                            value={title}
                            onChange={onChangeForm}
                        />
                        <Form.Text id="titel-help" muted>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Decription"
                            name="description"
                            value={description}
                            onChange={onChangeForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial Url"
                            name="url"
                            value={url}
                            onChange={onChangeForm}
                        />
                    </Form.Group>
                    <Form.Group className="my-3">
                        <Form.Control
                            as="select"
                            value={status}
                            name="status"
                            onChange={onChangeForm}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        LearnIt!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdatePostModal;

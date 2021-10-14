import { Modal, Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/postContext';

const AddPostModal = () => {
    // Contextt
    const { showAddModal, setAddModal, addPost, setShowToast } =
        useContext(PostContext);

    // state
    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN',
    });

    const { title, description, url } = newPost;

    // Handle Event
    const onChangeForm = (e) => {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
    };

    const closeDialog = () => {
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setAddModal(false);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await addPost(newPost);
        setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
        setAddModal(false);
        setShowToast({
            show: true,
            message,
            type: success ? 'success' : 'danger',
        });
    };

    return (
        <Modal show={showAddModal} onHide={closeDialog}>
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

export default AddPostModal;

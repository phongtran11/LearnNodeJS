import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ActionButton } from './ActionButton';

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    return (
        <Card
            className="shadow"
            border={
                status === 'LEARNED'
                    ? 'success'
                    : status === 'LEARNING'
                    ? 'warning'
                    : 'danger'
            }
        >
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{title}</p>
                            <span
                                className={`badge rounded-pill bg-${
                                    status === 'LEARNED'
                                        ? 'success'
                                        : status === 'LEARNING'
                                        ? 'warning'
                                        : 'danger'
                                }`}
                            >
                                {status}
                            </span>
                        </Col>
                        <Col className="text-end">
                            <ActionButton url={url} _id={_id}></ActionButton>
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;

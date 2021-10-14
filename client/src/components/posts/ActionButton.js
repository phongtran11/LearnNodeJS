import { Button } from 'react-bootstrap';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';
import { useContext } from 'react';
import { PostContext } from '../../contexts/postContext';

export const ActionButton = ({ url, _id }) => {
    const { deletePost, findPost, setShowUpdatePost } = useContext(PostContext);

    const choosePost = (postId) => {
        findPost(postId);
        setShowUpdatePost(true);
    };

    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="play" width="32" heigh="32" />
            </Button>
            <Button className="post-button">
                <img
                    src={editIcon}
                    alt="edit"
                    width="24"
                    heigh="24"
                    onClick={choosePost.bind(this, _id)}
                />
            </Button>
            <Button
                className="post-button"
                onClick={deletePost.bind(this, _id)}
            >
                <img src={deleteIcon} alt="delete" width="24" heigh="24" />
            </Button>
        </>
    );
};

import { Button } from 'react-bootstrap';
import playIcon from '../../assets/play-btn.svg';
import editIcon from '../../assets/pencil.svg';
import deleteIcon from '../../assets/trash.svg';

export const ActionButton = ({ url, _id }) => {
    return (
        <>
            <Button className="post-button" href={url} target="_blank">
                <img src={playIcon} alt="play" width="32" heigh="32" />
            </Button>
            <Button className="post-button">
                <img src={editIcon} alt="edit" width="24" heigh="24" />
            </Button>
            <Button className="post-button">
                <img src={deleteIcon} alt="delete" width="24" heigh="24" />
            </Button>
        </>
    );
};

import "./gist-list-item.scss";
import PropTypes from "prop-types";

const GistListItem = ({ imageUrl, fileName }) => {
  return (
    <li>
      <img src={imageUrl} alt="Profile" />
      <p>{fileName}</p>
    </li>
  );
};

GistListItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default GistListItem;

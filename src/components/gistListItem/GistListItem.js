import "./gist-list-item.scss";
import { useState } from "react";
import PropTypes from "prop-types";

const GistListItem = ({ imageUrl, fileName, flashImage }) => {
  const [isPressed, setIsPressed] = useState(false);

  const togglePressedState = () => {
    setIsPressed(!isPressed);
    flashImage(imageUrl);
  };

  return (
    <li onClick={togglePressedState} className={isPressed ? "pressed" : undefined}>
      <img src={imageUrl} alt="Profile" />
      <p>{fileName}</p>
    </li>
  );
};

GistListItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  flashImage: PropTypes.func.isRequired,
};

export default GistListItem;

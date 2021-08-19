import "./flashing-image.scss";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const FlashingImage = ({ imageToFlash, setImageToFlash }) => {
  const [isFlashing, setIsFlashing] = useState(false);
  const flashingContainer = useRef(null);

  useEffect(() => {
    if (imageToFlash !== "") {
      setIsFlashing(true);

      setTimeout(() => {
        setIsFlashing(false);
        flashingContainer.current.addEventListener("transitionend", function handler() {
          setImageToFlash("");
          this.removeEventListener("transitionend", handler);
        });
      }, 1000);
    }
  }, [imageToFlash]);

  return (
    <div
      id="flash-container"
      ref={flashingContainer}
      className={isFlashing ? "fade-in" : "fade-out"}
    >
      <img src={imageToFlash} alt="Profile" />
    </div>
  );
};

FlashingImage.propTypes = {
  imageToFlash: PropTypes.string.isRequired,
  setImageToFlash: PropTypes.func.isRequired,
};

export default FlashingImage;

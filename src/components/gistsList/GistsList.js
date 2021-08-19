import "./gists-list.scss";
import { useState, useEffect } from "react";
import api from "../../api/gists";
import GistListItem from "../gistListItem/GistListItem";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import FlashingImage from "../flashingImage/FlashingImage";

const GistsList = () => {
  const [gists, setGists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [imageToFlash, setImageToFlash] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const listGists = async () => {
    const fetchedData = await api.get("1970-01-01", 30, currentPage);

    setGists(fetchedData.data);
    setIsLoading(false);
    console.log(fetchedData.data);
  };

  useEffect(() => {
    listGists().catch((error) => {
      console.log(error);
    });
  }, [currentPage]);

  return (
    <div id="container">
      {/* Flashing Image container */}
      <FlashingImage imageToFlash={imageToFlash} setImageToFlash={setImageToFlash} />
      <div>
        {!isLoading ? (
          <ul id="gists-list">
            {gists.map((gist) => (
              <GistListItem
                key={gist.id}
                imageUrl={gist.owner.avatar_url}
                fileName={Object.values(gist.files)[0].filename}
                flashImage={setImageToFlash}
              />
            ))}
          </ul>
        ) : (
          <div id="loading-screen">
            <LoadingIndicator />
            <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GistsList;

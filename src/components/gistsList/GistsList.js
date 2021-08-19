import "./gists-list.scss";
import { useState, useEffect } from "react";
import api from "../../api/gists";
import GistListItem from "../gistListItem/GistListItem";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import FlashingImage from "../flashingImage/FlashingImage";
import Pagination from "../pagination/Pagination";

const GistsList = () => {
  const [gists, setGists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [imageToFlash, setImageToFlash] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Returns the last page from the response.header.links from the fetched object
  const returnLastPage = (headerLinks) => {
    const lastPageString = headerLinks.split(",").filter((link) => {
      return link.includes(`rel="last"`);
    })[0];

    if (!lastPageString) {
      return lastPage;
    }
    return Number(lastPageString.split("&page=").pop().split(">")[0]);
  };

  // Asynchronous function that lists all the gists with the given parameters
  const listGists = async () => {
    const fetchedData = await api.get("1970-01-01", 30, currentPage);

    setGists(fetchedData.data);
    setLastPage(returnLastPage(fetchedData.headers.link));
    setIsLoading(false);
  };

  // useEffect hook, whick has currentPage in its dependency array so a new fetch will be triggered every time the currentPage changes
  useEffect(() => {
    listGists().catch((error) => {
      console.log(error);
    });
  }, [currentPage]);

  // Sets the currentPage to a specific number & triggers loading, which in turn fires up a get request with that page number as a search param
  const changeToPage = (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
  };

  return (
    <div id="container">
      {/* Flashing Image container */}
      <FlashingImage imageToFlash={imageToFlash} setImageToFlash={setImageToFlash} />
      <div>
        {!isLoading ? (
          // Gists List
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
          // Loading Screen
          <div id="loading-screen">
            <LoadingIndicator />
            <p>Loading...</p>
          </div>
        )}
      </div>
      {/* Pagination */}
      {lastPage !== undefined && (
        <Pagination currentPage={currentPage} lastPage={lastPage} onChange={changeToPage} />
      )}
    </div>
  );
};

export default GistsList;

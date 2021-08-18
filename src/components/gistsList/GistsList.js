import "./gists-list.scss";
import { useState, useEffect } from "react";
import api from "../../api/gists";
import GistListItem from "../gistListItem/GistListItem";

const GistsList = () => {
  const [gists, setGists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    <div>
      {!isLoading && (
        <ul id="gist-list">
          {gists.map((gist) => (
            <GistListItem
              key={gist.id}
              imageUrl={gist.owner.avatar_url}
              fileName={Object.values(gist.files)[0].filename}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default GistsList;

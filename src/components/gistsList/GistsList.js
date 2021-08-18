import "./gists-list.scss";
import { useState, useEffect } from "react";
import api from "../../api/gists";

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
      <p>gists list</p>
    </div>
  );
};

export default GistsList;

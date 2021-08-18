import "./gist-list-item.scss";

const GistListItem = ({ imageUrl, fileName }) => {
  return (
    <li>
      <img src={imageUrl} alt="Profile" />
      <p>{fileName}</p>
    </li>
  );
};

export default GistListItem;

import { Link } from "react-router-dom";

export const LinkBox = ({ imageUrl, linkUrl }) => {
  return (
    <Link to={linkUrl} className="w-48 h-48 rounded-lg overflow-hidden">
      <img
        src={require(`../../assets/${imageUrl}`).default}
        alt="Logo wydziału"
        className="w-full h-full object-cover"
      />
    </Link>
  );
};
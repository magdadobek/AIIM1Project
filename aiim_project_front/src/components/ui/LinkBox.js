import { Link } from "react-router-dom";

export const LinkBox = ({ imageUrl, linkUrl, text }) => {
  return (
    <Link to={linkUrl} 
    className="w-48 h-48 items-center ml-20 rounded-lg overflow-hidden
    relative group transition duration-300 hover:shadow-lg group-hover:opacity:100
    hover:bg-rgb(33,63,63)">
      <img
        src={imageUrl}
        alt="Logo wydziału"
        className="w-full h-full object-cover"
      />
      <div 
      className="absolute inset-0 flex items-center justify-center 
      opacity-0 group-hover:opacity-100 transition duration-300">
        <p className="text-black dark:text-white hover:text-gold_umg dark:hover:text-yellow_umg">{text}</p>
      </div>
    </Link>
  );
};

import { Link } from "react-router-dom";

export const LinkBox = ({ imageUrl, linkUrl, text }) => {
  return (
    <Link to={linkUrl} 
    className="w-64 h-64 p-2 items-center rounded-3xl overflow-hidden
    relative group transition duration-300 hover:shadow-2xl
    hover:bg-rgb(33,63,63)">
      <img
        src={imageUrl}
        alt="Logo wydziału"
        className="w-full h-full object-cover opacity-100 group-hover:opacity-40 duration-300"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <p className="text-lg hover:text-xl font-bold duration-300 hover:underline text-light_menu dark:text-white hover:text-yellow_umg hover:dark:text-yellow_umg">{text}</p>
      </div>
    </Link>
  );
};

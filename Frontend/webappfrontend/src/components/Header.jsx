const Header = ({ nombre, avatarUrl }) => {
    return (
      <div className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-10 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full mr-2" />
            <span className="text-xl font-semibold">{nombre}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;
  
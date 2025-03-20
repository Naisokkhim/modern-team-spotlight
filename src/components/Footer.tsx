
const Footer = () => {
  return (
    <footer className="bg-white py-8 sm:py-12 px-6 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-xl font-medium flex items-center space-x-2 justify-center md:justify-start">
              <span className="w-3 h-3 bg-black rounded-full"></span>
              <span>G3</span>
            </div>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">© {new Date().getFullYear()} G3 Team Project. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:flex-row space-y-0 space-x-6 md:space-x-8">
            <a href="#" className="text-gray-600 hover:text-black transition-colors text-center md:text-left">Team</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors text-center md:text-left">Projects</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors text-center md:text-left">About</a>
            <a href="#" className="text-gray-600 hover:text-black transition-colors text-center md:text-left">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

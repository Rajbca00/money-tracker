export default function Tile({ title, amount, style, IconImage }) {
    return (
  
      <a className="transform flex-1 mx-6 hover:scale-105 transition duration-300 shadow-xl rounded-lg  intro-y bg-white" href="#">
        <div className="p-5">
          <div className="flex">
          <IconImage style={`ml-auto ${style}`} />
            {/* <div className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
              <span className="flex items-center">12%</span>
            </div> */}
          </div>
          <div className="ml-2 w-full flex-1">
            <div>
              <div className="mt-3 text-3xl font-bold leading-8">{amount}</div>
  
              <div className={`mt-1 text-base text-gray-600 ${style}`}>{title}</div>
            </div>
          </div>
        </div>
      </a>
    );
  };
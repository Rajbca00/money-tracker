import { useState } from 'react';

const Dropdown = ({data}) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // console.log(data)

  return (
    <div className="relative">
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
      >
        <option value="all">All</option>
        {data.map((monthAndYear, index) => (
        <option key={index} value={monthAndYear}>
          {monthAndYear}
        </option>
      ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6z"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;

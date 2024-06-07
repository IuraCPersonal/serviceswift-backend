import {
  HomeOutlined,
  Devices,
  CleanHands,
  Plumbing,
  Hvac,
  Checkroom,
  Iron,
  Lightbulb,
  Deck,
  CarCrash,
} from "@mui/icons-material";

const Categories = () => {
  const categories = [
    { name: "Home", icon: <HomeOutlined /> },
    { name: "Devices", icon: <Devices /> },
    { name: "Cleaning", icon: <CleanHands /> },
    { name: "Plumbing", icon: <Plumbing /> },
    { name: "Hvac", icon: <Hvac /> },
    { name: "Checkroom", icon: <Checkroom /> },
    { name: "Ironing", icon: <Iron /> },
    { name: "Electrical", icon: <Lightbulb /> },
    { name: "Outside", icon: <Deck /> },
    { name: "Car repair", icon: <CarCrash /> },
  ];

  return (
    <div className="w-full flex justify-between items-center gap-8 my-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className={`flex ${
            index === 0 ? "text-black" : "text-gray-400"
          } flex-col items-center justify-center px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black transition-all duration-300 ease-in-out`}
        >
          {category.icon}
          <span className="text-sm">{category.name}</span>
        </div>
      ))}

      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Filters{" "}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
    </div>
  );
};

export default Categories;

import Router from "next/router";

const RolesPage = () => {
  return (
    <div className="flex flex-col mx-auto max-w-2xl">
      <h1 className="text-5xl">Glad you are here.</h1>

      <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Choose your account type.
      </h3>
      <ul className="grid w-full gap-6 md:grid-cols-2">
        <li>
          <input
            type="radio"
            id="hosting-small"
            name="hosting"
            value="hosting-small"
            className="hidden peer"
            required
          />
          <label
            for="hosting-small"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex p-2 flex-col">
              <div className="w-full text-lg font-semibold">I’m A Customer</div>
              <div className="w-full">
                Ideal for users looking for home services and specialized
                providers.
              </div>
              <ul className="w-full mt-3">
                <li>Book a variety of home services</li>
                <li>Save time and find a service provider</li>
                <li>Transparent pricing and reviews</li>
              </ul>
            </div>
            <svg
              className="w-5 h-5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="hosting-big"
            name="hosting"
            value="hosting-big"
            className="hidden peer"
          />
          <label
            for="hosting-big"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex p-2 flex-col">
              <div className="w-full text-lg font-semibold">I'm A Provider</div>
              <div className="w-full">
                Ideal for individuals or companies providing home services or
                consultancy.
              </div>
              <ul className="w-full mt-3">
                <li>List your servicess</li>
                <li>Gain access to a wide network</li>
                <li>Easy scheduling and management tools</li>
              </ul>
            </div>
            <svg
              className="w-5 h-5 ms-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </label>
        </li>
      </ul>

      <button
        className="mt-5 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        onClick={() => Router.push("/auth/info")}
      >
        Continue
      </button>
    </div>
  );
};

export default RolesPage;

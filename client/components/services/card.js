import Link from "next/link";

const ServiceCard = ({ job }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <img
        className="rounded-t-lg max-h-52 w-96 object-cover"
        src={
          job.imageUrl ||
          "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
        }
        alt=""
      />
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {job.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700">${job.price} / job</p>
        <Link
          href="/jobs/[jobId]"
          as={`/jobs/${job.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Learn more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;

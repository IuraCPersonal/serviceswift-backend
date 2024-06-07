const ProviderPage = () => {
  return (
    <div>
      <div className="flex flex-row flex-nowrap justify-between gap-8">
        <div className="flex flex-col flex-1 justify-center gap-5">
          <h1 className="text-5xl">Garden Masters</h1>
          <p className="text-2xl text-gray-600">
            Garden Masters offers comprehensive gardening services including
            lawn mowing, hedge trimming, weeding, and garden cleanup.
          </p>

          <button className="bg-blue-500 max-w-fit text-white py-2 px-4 rounded">
            Contact us
          </button>
        </div>
        <div className="flex flex-col flex-1">
          <img src="/gardening.svg" alt="Gardening" />
        </div>
      </div>

      <hr className="my-10" />

      <div className="flex flex-col gap-8">
        <h1 className="text-5xl">Our services</h1>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex flex-row flex-wrap gap-8">
            <div className="flex flex-col flex-1">
              <h2 className="text-3xl">Lawn mowing</h2>
              <p className="text-gray-600">
                We offer lawn mowing services for all types of lawns, big or
                small. Our team of professionals will ensure your lawn is
                perfectly mowed.
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-3xl">Hedge trimming</h2>
              <p className="text-gray-600">
                Our hedge trimming services will keep your hedges looking neat
                and tidy. We can trim hedges of all shapes and sizes.
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-3xl">Weeding</h2>
              <p className="text-gray-600">
                Our weeding services will keep your garden free from weeds. We
                can remove weeds from flower beds, lawns, and other areas.
              </p>
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-3xl">Garden cleanup</h2>
              <p className="text-gray-600">
                Our garden cleanup services will keep your garden looking neat
                and tidy. We can remove leaves, branches, and other debris from
                your garden.
              </p>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10" />

      <div className="flex flex-col gap-8 mb-11">
        <h1 className="text-5xl">Contact us</h1>

        <div className="flex flex-row flex-wrap gap-8">
          <div className="flex flex-col flex-1">
            <h2 className="text-3xl">Location</h2>
            <p className="text-gray-600">123 Main Street, Anytown, USA</p>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-3xl">Phone</h2>
            <p className="text-gray-600">(555) 123-4567</p>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-3xl">Email</h2>
            <p className="text-gray-600">
              <a href="mailto:">garden@master.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderPage;

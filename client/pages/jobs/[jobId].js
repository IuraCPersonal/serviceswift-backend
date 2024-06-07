import useRequest from "../../hooks/useRequest";
import Router from "next/router";
import Link from "next/link";
import {
  AvTimer,
  CurrencyExchange,
  LocationOn,
  Person,
} from "@mui/icons-material";
import ReviewsList from "../../components/reviews/list";
import { useState } from "react";

const JobShow = ({ job }) => {
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

  const handleReviewDialogOpen = () => setReviewDialogOpen(true);

  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      jobId: job.id,
    },
    onSuccess: (order) =>
      Router.push("/orders/[orderId]", `/orders/${order.id}`),
  });

  return (
    <div>
      <div className="w-full flex justify-between flex-nowrap gap-8">
        <div className="grid gap-4 flex-1">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1601001815894-4bb6c81416d7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1524247108137-732e0f642303?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1611740192940-0e390d409397?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div>
              <img
                className="h-auto max-w-full rounded-lg"
                src="https://images.unsplash.com/photo-1584479898061-15742e14f50d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-5xl">{job.title}</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            pharetra, purus et placerat faucibus, arcu urna tincidunt nunc, nec
            euismod turpis libero ac sapien. Nullam nec nunc id nisl tincidunt
            varius.
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <LocationOn fontSize="small" />
              <span className="text-sm font-semibold">Location: </span>
              <span>Chisinau</span>
            </div>

            <div className="flex items-center gap-2">
              <CurrencyExchange fontSize="small" />
              <span className="text-sm font-semibold">Price: </span>
              <span>{job.price}</span>
            </div>

            <div className="flex items-center gap-2">
              <AvTimer fontSize="small" />
              <span className="text-sm font-semibold">Service Hours: </span>
              <span>8 AM to 6 PM (Monday to Saturday)</span>
            </div>

            <div className="flex items-center gap-2">
              <Person fontSize="small" />
              <span className="text-sm font-semibold">Provider: </span>
              <Link
                href="/providers/[providerId]"
                as={`/providers/${job.userId}`}
                className="text-blue-500 hover:underline"
              >
                Garden Masters
              </Link>
            </div>
          </div>

          {/* secondary button add review */}

          <div className="flex gap-4 w-full mt-auto">
            <button
              onClick={() => handleReviewDialogOpen()}
              className="bg-slate-500 hover:bg-slate-700 transition-colors text-white font-bold py-2 px-4 rounded"
            >
              Add Review
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 transition-colors text-white font-bold py-2 px-4 rounded"
              onClick={() => doRequest()}
            >
              Book Service Now
            </button>
          </div>
        </div>
      </div>

      <h1 className="text-3xl mt-10">Reviews</h1>

      <ReviewsList
        reviewDialogOpen={reviewDialogOpen}
        setReviewDialogOpen={setReviewDialogOpen}
        handleReviewDialogOpen={handleReviewDialogOpen}
      />

      <div className="mt-10">
        <h1 className="text-3xl mb-2">Gallery</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://lh3.googleusercontent.com/proxy/PI03pafSG3U3iBSvsSHagTxoxp1mXDPzcoNO3NawhFFIC8sR5BI3IHrfuAshGvV2cm0g6Qg_YwgbX2KMG0_Urce05xTlfaM2Jnsi6iD1AuIlVPM0OF1Q4c6hycU-V71G6CnBS0D2mDAZw7-xl3RPB-j8XGt50qY05brShFOUJ4KpZkDoV7Or5XdxOfvti_g1-QAt_l6GMd6DRnoABvF8gt2B-Ct4m1J87XGr9-xeP0CVwYHnmyT2G3JLrXQp_puvF5EN"
              alt=""
            />
          </div>
          <div className="mb-8">
            <img
              className="h-auto max-w-full rounded-lg"
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxpNLDHsDjSPwdzNVUhXX_tVTDL69LYZjbNHOoQwXSfkWFTN84XTdrrOyZ2iARDT4sNWAqvNv4Y0MeyiXDfjTLG3zZ96hQEQI9fB5p_3dEYx-3Ojrpw8zQXU4-wYyN5xNNY5aVuWyJzmQ/s4032/EcoCostel-Garden2021.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

JobShow.getInitialProps = async (context, client) => {
  const { jobId } = context.query;
  const { data } = await client.get(`/api/jobs/${jobId}`);

  return { job: data };
};

export default JobShow;

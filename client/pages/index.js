import Link from "next/link";
import ServiceCard from "../components/services/card";
import Categories from "../components/filters/categories";
import SearchArea from "../components/filters/search";

const Home = ({ currentUser, jobs }) => {
  const jobsList = jobs.map((job) => {
    return <ServiceCard job={job} key={job.id} />;
  });

  return (
    <div className="w-full">
      <SearchArea />
      <Categories />
      <div className="flex flex-row gap-4 flex-wrap">{jobsList}</div>
    </div>
  );
};

Home.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/jobs");

  return { jobs: data };
};

export default Home;

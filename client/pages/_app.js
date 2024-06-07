import buildClient from "../api/build-client";
import Header from "../components/header";

import "../styles/globals.css";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="max-w-screen-xl flex mx-auto mt-8">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentUser");

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client, // pass client to getInitialProps
      data.currentUser
    );
  }

  return { pageProps, ...data };
};

export default AppComponent;

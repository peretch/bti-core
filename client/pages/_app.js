import buildClient from '../api/build-client';
import Header from '../components/header';

import 'bootstrap/dist/css/bootstrap.css';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} currentUser={currentUser} />
    </div>
  );
};

// `getInitialProps` enables server-side rendering in a page and allows you to do initial data population,
// it means sending the page with the data already populated from the server. This is especially useful for SEO.
// ? This method is called from server only when user makes refresh, or clicking link, or typing Ultrasonic
// ? If this component is loaded from navigation, this function will be executed on the application (For example, after login)

// ! This getInitialProsp does not receives context with the same format than when we are un _app.js file in NextJS
// AppComponent.getInitialProps = async (context) => {

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const response = await client.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
  const { data } = response || {};
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  const { currentUser } = data || {};

  return {
    pageProps,
    currentUser,
  };
};

export default AppComponent;

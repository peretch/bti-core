import buildClient from '../api/build-client';

const HomePage = ({ currentUser }) => {
  return (
    <div className="container my-4">
      <h1>Dashboard</h1>
      {currentUser ? (
        <p>Hello {currentUser.email}!</p>
      ) : (
        <p>Welcome stranger!</p>
      )}
    </div>
  );
};

// `getInitialProps` enables server-side rendering in a page and allows you to do initial data population,
// it means sending the page with the data already populated from the server. This is especially useful for SEO.
// ? This method is called from server only when user makes refresh, or clicking link, or typing Ultrasonic
// ? If this component is loaded from navigation, this function will be executed on the application (For example, after login)
HomePage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const response = await client.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
  const { data } = response || {};
  return data;
};

export default HomePage;

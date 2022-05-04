import axios from 'axios';
import buildClient from '../api/build-client';

const HomePage = ({ currentUser }) => {
  return (
    <div>
      <h1>Big Ticket Items!</h1>
      {currentUser ? (
        <ul>
          <li>
            <a href="/">Sign Out</a>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <a href="/auth/signup">Sign Up!</a>
          </li>
          <li>
            <a href="/auth/signin">Sign In!</a>
          </li>
        </ul>
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
  const { data } = await client.get('/api/users/currentuser').catch((err) => {
    console.log(err.message);
  });
  return data;
};

export default HomePage;

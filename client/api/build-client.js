import axios from 'axios';

// Here we will make use of the defined rules in ingress-srv.yaml to fetch data from services
// We need to extract the Cookie of the Request, and forward it to the Auth services through the Ingress Controller
// If we want to reach for example directly the Auth service, since they are in the same Namespace, we can do it with URL http://auth-srv
// In this case, we CAN'T access ingress controller like ingress-server, because that pod is in OTHER Namespace
// You can use `kubectl get namespaces` to see all existent Namespaces, you will see `default` and `ingress-nginx` as separated Namespaces
// With command `kubectl get services -n ingress-nginx` we will see that the name of servie is ingress-nginx-controller
// Example URL: `http://ingress-nginx.ingress-nginx-controller.svc.cluster.local/api/users/currentUser`

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // We are on server
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;

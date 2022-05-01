# bti-common

This project is an implementation of microservices with nodejs, express and react.

## Installation

### 1. Install skaffold globally

Find [here](https://skaffold.dev/docs/install/) the installer

### 2. Create JWT token

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret
```

### 3. Install ingress-controller

```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml
```

## Run project in development mode

### 1. Run skaffold

```
skaffold dev
```

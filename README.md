# bti-common

This project is an implementation of microservices with nodejs, express and react.

## Installation

### 1. Install skaffold globally

Find [here](https://skaffold.dev/docs/install/) the installer

### 2. Create JWT token

```
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=secret
```

### 3. Run skaffold

```
skaffold dev
```

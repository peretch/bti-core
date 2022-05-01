# bti-common

## This project is designed to be used as an implementation of microservices with nodejs, express and react.

## Installing and running the envoronment

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

---

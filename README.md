# basic-sm-service-deployment

Using this as a quick service to deploy on OSSM to test out capabilities and practice migrations

## About the application

The application that is stored in the root folder is a basic node.js app that:
 1. will ping google ever 10 seconds
 2. has a base root that just returns 200 and listens on port 8080

This gives us a starting point of an application that has some ingress or egress.

NOTE: I plan on including some Openshift pipelines in the iac that will automatically deploy the code in an image stream,
but for now I have just built the image locally and deployed it here https://quay.io/repository/dferoli/ping-google

## About the iac

This also contains all of the infrastructure as code to get the application and gateway deployed. 
The application contains all of the basic openshift resources, as well as all of the required service mesh resources. 
The gateway folder includes the deployment for the gateway that will eventaully go to the application.

## Recreating the setup on a fresh OpenShift Instance

### Install OSSM

From the software catalog or Operator hub, find and install the following operators:
 - Red Hat OpenShift Service Mesh 2
 - Kiali Operator


Next, create a new namespace `istio-system`

And create the following ServiceMeshControlPlane

```
apiVersion: maistra.io/v2
kind: ServiceMeshControlPlane
metadata:
  name: basic
  namespace: istio-system
spec:
  version: v2.6
  tracing:
    type: None
    sampling: 10000
  addons:
    kiali:
      enabled: true
      name: kiali
    grafana:
      enabled: true
```

Also add the following ServiceMeshMemberRoll

```
apiVersion: maistra.io/v1
kind: ServiceMeshMemberRoll
metadata:
  name: default
  namespace: istio-system
spec:
  members:
    - sm-practice
    - practice-gateway
```

### Deploy Application

In a fresh argo instance, create a new application that points to this repo using the iac path.
That creates 2 separate applications, 1 for the application and 1 for the gateway

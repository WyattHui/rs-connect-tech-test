# RS Connect - Tech Test #
[![RS Connect](https://rsconnect.com/wp-content/uploads/2015/07/RS-Connect2.png)](https://rsconnect.com/)

### Summary ###
The application should provide endpoints for creating image objects in a datastore, managing the objects in the datastore and providing new (resized) renditions of existing image objects already present in the datastore.

### Dependencies
* AWS CLI (https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* Terraform (https://www.terraform.io)
* Docker (https://www.docker.com)
* Node.js (https://nodejs.org)
### Development
* Install npm packages

    ```
    npm install
    ```

* Build and run the Docker image

    ```
    npm run build
    npm run start
    ```

### Deployment instructions
* For version update, please edit the version number in
  * package.json

* Retrieve an authentication token and authenticate your Docker client to your registry

    ```
    npm run docker-login-aws
    ```

* Build, tag and push the Docker image

    ```
    npm run build-prod
    npm run tag
    npm run push
    ```

* AWS ECS Update Service

    ```
    npm run aws-ecs-update-service
    ```

### Team contacts
* Wyatt Hui (wyatt.hui.1104@gmail.com)

# RS Connect - Tech Test #
[![RS Connect](https://rsconnect.com/wp-content/uploads/2015/07/RS-Connect2.png)](https://rsconnect.com/)

### Summary ###
The application should provide endpoints for creating image objects in a datastore, managing the objects in the datastore and providing new (resized) renditions of existing image objects already present in the datastore.

### Dependencies
* Docker (https://www.docker.com)
* Node.js (https://nodejs.org)

### Development
* Run docker

    ```
    docker build . -t rs-connect-tech-test
    docker run -p 8080:8080 -it rs-connect-tech-test
    ```

### Deployment instructions
* For version update, please edit the version number in
  * package.json

### Team contacts
* Wyatt Hui (wyatt.hui.1104@gmail.com)

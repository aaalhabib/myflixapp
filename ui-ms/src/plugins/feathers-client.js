import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import auth from "@feathersjs/authentication-client";
import axios from "axios";

const api = feathers();

const restClient = rest();

api.configure(restClient.axios(axios));

api.configure(
  auth({
    storageKey: "auth"
  })
);

export default api;

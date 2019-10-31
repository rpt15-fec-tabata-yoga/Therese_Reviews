import http from "k6/http";
import { check } from "k6";

export let options = {
  vus: 10,
  duration: "10s"
};

export default function() {
  let res = http.get(`http://localhost:3001/api/reviews/mult/10`);
  check(res, {
    "Success get": (r) => r.status == 200
  });
};
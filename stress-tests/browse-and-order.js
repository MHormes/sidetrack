import http from "k6/http";
import { sleep, check } from "k6";

// k6 run --env BASE_URL=https://staging.sidetracksounds.nl stress-tests/browse-and-order.js

const BASE_URL = __ENV.BASE_URL || "https://staging.sidetracksounds.nl";

export const options = {
  stages: [
    { duration: "2m",  target: 100 },  // ramp to 100
    { duration: "2m",  target: 250 },  // ramp to 250
    { duration: "2m",  target: 500 },  // ramp to 500
    { duration: "3m",  target: 500 },  // hold at 500
    { duration: "30s", target: 0   },  // ramp down
  ],
  thresholds: {
    http_req_failed:   ["rate<0.01"],      // <1% errors
    http_req_duration: ["p(95)<3000"],     // 95% of requests under 3s
  },
};

const PRODUCTS = [
  { productId: 1, productName: "SDTRCK Trui (Groen)", size: "M", quantity: 1, priceCents: 3500 },
  { productId: 2, productName: "SDTRCK T-Shirt (Rood)", size: "L", quantity: 1, priceCents: 2200 },
];

export default function () {
  // 1. Home page
  let res = http.get(`${BASE_URL}/`);
  check(res, { "home 200": (r) => r.status === 200 });
  sleep(1);

  // 2. Shop listing
  res = http.get(`${BASE_URL}/shop`);
  check(res, { "shop 200": (r) => r.status === 200 });
  sleep(1);

  // 3. Product detail
  res = http.get(`${BASE_URL}/shop/1`);
  check(res, { "product 200": (r) => r.status === 200 });
  sleep(2);

  // 4. Place order
  const product = PRODUCTS[__VU % PRODUCTS.length];
  const payload = JSON.stringify({
    customer: {
      naam: `Test User ${__VU}-${__ITER}`,
      email: `test${__VU}${__ITER}@example.com`,
      telefoon: "+31612345678",
      straat: "Teststraat 1",
      postcode: "1234 AB",
      stad: "Amsterdam",
    },
    items: [product],
  });

  res = http.post(`${BASE_URL}/api/orders`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  check(res, { "order 201": (r) => r.status === 201 });
  sleep(1);
}
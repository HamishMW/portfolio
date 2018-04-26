const { run } = require("react-snap");

run({
  include: [
    "/projects/smart-sparrow",
    "/projects/slice"
  ],
  crawl: true,
  skipThirdPartyRequests: true,
  headless: false
});

// src/images/index.js
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const mountainImgs = importAll(
  require.context("./mountain", false, /\.(jpg|jpeg|png)$/)
);
const beachesImgs = importAll(
  require.context("./beaches", false, /\.(jpg|jpeg|png)$/)
);
const birdsImgs = importAll(
  require.context("./birds", false, /\.(jpg|jpeg|png)$/)
);
const foodImgs = importAll(
  require.context("./food", false, /\.(jpg|jpeg|png)$/)
);

export { mountainImgs, beachesImgs, birdsImgs, foodImgs };

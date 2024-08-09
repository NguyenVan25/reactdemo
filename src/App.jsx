import React, { useState } from "react";

// Đối tượng chứa link ảnh cho từng danh mục
const images = {
  Mountain: [
    "https://savacotourist.com/upload/filemanager/NewFolder/Alps%20.jpg",
    "https://savacotourist.com/upload/filemanager/NewFolder/nui-alpa-co-gi-dac-biet%20.jpg",
    "https://savacotourist.com/upload/filemanager/NewFolder/thoi-tiet%20.jpg",
    "https://savacotourist.com/upload/filemanager/NewFolder/day-nui-alps-di-qua-thuy-sy%20.jpg",
    "https://savacotourist.com/upload/filemanager/NewFolder/alps-giap-nuoc-y%20.jpg",
    "https://savacotourist.com/upload/filemanager/NewFolder/chamonix.jpg",
    "https://savacotourist.com/upload/filemanager/NewFolder/Hallstatt-dia-qua-ao%20.jpg",
    "https://www.tsttourist.com/vnt_upload/news/05_2022/tsttourist-diem-danh-5-ngon-nui-tuyet-dep-nhat-thuy-si-1.jpg",
  ],
  Beaches: [
    "https://www.gbni.co.jp/content/img/2021/05/10.jpg",
    "https://image.baogialai.com.vn/w800/dataimages/201711/original/images2596562_a_1.jpg",
    "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/bien-li-son.jpg",
    "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/canh-dep-dao-ly-son-21.jpg",
    "https://topquangngai.vn/wp-content/uploads/2021/01/bai-bien-dep-o-Quang-Ngai-1.jpg",
    "https://owa.bestprice.vn/images/destinations/uploads/bai-bien-an-hai-5f9b1750e316a.jpg",
    "https://lalavieinvestment.com/uploads/images/7(11).png",
    "https://lalavieinvestment.com/uploads/images/2(79).png",
  ],
  Birds: [
    "https://camnangxnk-logistics.net/wp-content/uploads/2020/03/45e41f84c365692a3ddc01e8bf182db4.jpg",
    "https://www.chimhay.net/wp-content/uploads/2023/06/chao-mao-lan.jpg",
    "https://cdn.pixabay.com/photo/2022/10/24/14/41/blackbird-7543630_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/12/08/15/30/bird-8437764_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/12/08/15/30/bird-8437764_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/12/05/16/54/blackbird-4675637_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/04/25/17/48/bird-3350136_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/05/30/05/50/yellow-headed-blackbird-8027623_1280.jpg",
  ],
  Food: [
    "https://cdn.pixabay.com/photo/2020/03/28/14/51/fried-chicken-4977349_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/27/03/25/cake-2685101_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/03/25/02/29/bread-4965907_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/03/25/02/31/rolls-4965914_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/05/15/13/30/food-8763576_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/05/27/12/35/noodles-8021415_1280.png",
    "https://cdn.pixabay.com/photo/2021/10/21/12/48/beef-noodle-soup-6729018_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/10/21/12/38/pho-ga-6729006_1280.jpg",
  ],
};

function App() {
  const [category, setCategory] = useState("Mountain");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(images[category] || []);
  const [message, setMessage] = useState("");

  const handleClick = (category) => {
    setCategory(category);
    setSearchTerm(""); // Reset search term when changing category
    setFilteredImages(images[category]);
    setMessage(""); // Reset message when changing category
  };

  const handleSearch = () => {
    if (searchTerm && images[searchTerm]) {
      setFilteredImages(images[searchTerm]);
      setMessage(""); // Reset message if search term is found
    } else {
      setFilteredImages([]);
      setMessage("No found");
    }
  };

  return (
    <>
      <div className="container">
        <h1 id="one">SnapShot</h1>
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button" className="submit" onClick={handleSearch}>
            <svg height="30" width="30" viewBox="0 0 64 64">
              <circle
                cx="27"
                cy="27"
                r="16"
                stroke="white"
                strokeWidth="4"
                fill="none"
              />
              <line
                x1="41"
                y1="41"
                x2="58"
                y2="58"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </button>
        </div>
        <div className="button">
          <button onClick={() => handleClick("Mountain")}>Mountain</button>
          <button onClick={() => handleClick("Beaches")}>Beaches</button>
          <button onClick={() => handleClick("Birds")}>Birds</button>
          <button onClick={() => handleClick("Food")}>Food</button>
        </div>
        <div>
          <h2>
            {filteredImages.length > 0 ? `${category} Pictures` : message}
          </h2>
          <div className="image-gallery">
            {filteredImages.length > 0
              ? filteredImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${category} ${index}`}
                    className="gallery-img"
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

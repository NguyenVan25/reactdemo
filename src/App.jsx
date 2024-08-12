import React, { useEffect, useState } from "react";

const API_ENDPOINTS = {
  Ethereum: "./tokenlist/Ethereum.json",
  Arbitrum: "./tokenlist/Arbitrum.json",
  Optimism: "./tokenlist/Optimism.json",
  Bsc: "./tokenlist/Bsc.json",
};

// Thành phần Loading đơn giản
const Loading = () => {
  return <div className="loading"></div>;
};

function App() {
  const [category, setCategory] = useState("Ethereum");
  const [tokens, setTokens] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTokens, setFilteredTokens] = useState([]);
  const [showImages, setShowImages] = useState(false); // Thêm state để điều khiển hiển thị ảnh

  useEffect(() => {
    setLoading(true);
    fetch(API_ENDPOINTS[category])
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTokens(data);
        setFilteredTokens(data);
        setLoading(false);

        // Bắt đầu timer hiển thị ảnh sau 4s
        setTimeout(() => {
          setShowImages(true);
        }, 1000); // 4000 mili giây = 4 giây
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setLoading(false);
      });
  }, [category]);

  const handleClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setSearchTerm("");
    setShowImages(false); // Reset showImages khi thay đổi category
  };

  const handleSearch = () => {
    setFilteredTokens(
      tokens.filter((token) =>
        token.symbol.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
    );
    setShowImages(false); // Reset showImages khi tìm kiếm
  };
  const DEFAULT_TOKEN_IMAGE =
    "https://cdn.imgbin.com/9/8/16/imgbin-computer-icons-question-mark-scalable-graphics-blue-question-mark-icon-white-question-mark-n3SxnveXUmn5aQ5jsUSiPZ48T.jpg";

  return (
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
        <button onClick={() => handleClick("Ethereum")}>Ethereum</button>
        <button onClick={() => handleClick("Arbitrum")}>Arbitrum</button>
        <button onClick={() => handleClick("Optimism")}>Optimism</button>
        <button onClick={() => handleClick("Bsc")}>Bsc</button>
      </div>
      <div>
        <h2>
          {filteredTokens.length > 0 ? `${category} Tokens` : "No tokens found"}
        </h2>
        <div className="token-gallery">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <Loading key={index} />
              ))
            : showImages
            ? // Hiển thị tối đa 20 token đầu tiên
              filteredTokens.slice(0, 20).map((token, index) => (
                <div key={index} className="token-item">
                  <img
                    src={token.logoURI ? token.logoURI : DEFAULT_TOKEN_IMAGE}
                    className="gallery-img"
                    onError={(e) => (e.target.src = DEFAULT_TOKEN_IMAGE)} // Xử lý lỗi khi tải ảnh
                    title={token.symbol}
                  />
                </div>
              ))
            : // Hiển thị loading nếu showImages là false
              Array.from({ length: 20 }).map((_, index) => (
                <Loading key={index} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;

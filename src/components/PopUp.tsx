import download from "../assets/download.svg";
import like from "../assets/like.svg";
import views from "../assets/view.svg";

export default function PopUp({
  setSelectedImage,
  selectedImage,
  imageStatistic,
}: any) {
  return (
    <div
      className="popup-modal"
      onClick={() => setSelectedImage(null)}
      style={{ display: selectedImage ? "block" : "none" }}
    >
      <div className="popup-modal-image-container">
        <img src={selectedImage?.urls.full} className="popup-modal-image" />
        <div className="popap-modal-statistics">
          <span>
            <img src={like} />
            {selectedImage?.likes}
          </span>
          <span>
            <img src={views} />
            {imageStatistic?.views.total}
          </span>
          <span>
            <img src={download} />
            {imageStatistic?.downloads.total}
          </span>
          <span className="popup-cancel" onClick={() => setSelectedImage(null)}>
            &times;
          </span>
        </div>
      </div>
    </div>
  );
}

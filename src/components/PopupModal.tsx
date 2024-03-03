export default function () {
  return (
    <div className="popup-modal-image-container">
      <img src={selectedImage?.urls.full} className="popup-modal-image" />

      <div className="popap-modal-statistics">
        <span>likes:</span>
        <span>views:</span>
        <span>dawnloads:</span>
      </div>
    </div>
  );
}

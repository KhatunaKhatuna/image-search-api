const Gallery = ({ images, setSelectedImage }: any) => {
  return (
    <div className="wraper">
      <div className="gallery">
        {images.map((image: Image) => (
          <div className="image-container" key={image.id}>
            <img
              className="image"
              onClick={() => setSelectedImage(image)}
              src={image.urls?.small}
              alt={image.slug}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

import loader from "../assets/loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img className="loader-img" src={loader} alt="loader" />
    </div>
  );
};

export default Loader;

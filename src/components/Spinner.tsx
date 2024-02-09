import "../styles/components/_custom-loader.scss";

function Spinner() {
  return (
    <div className="custom-loader">
      <h2>Searching for your items...</h2>
      <div className="spinner-parent">
        <div className="spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default Spinner;

function Spinner({ small }) {
  return (
    <div
      className="loader-container"
      style={{
        width: `${small ? "100%" : "100%"}`,
        height: `${small ? "50px" : "75vh"}`,
      }}
    >
      <span
        className="loader"
        style={{
          width: `${small ? "35px" : "48px"}`,
          height: `${small ? "35px" : "48px"}`,
        }}
      ></span>
    </div>
  );
}

export default Spinner;

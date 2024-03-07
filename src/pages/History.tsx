export default function History({ queryList }: any) {
  console.log(queryList);
  return (
    <div className="container" style={{}}>
      <ul
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          padding: " 150px 0",
          color: "#fff",
          fontSize: "24px",
        }}
      >
        {queryList.map((item: any) => (
          <li style={{ cursor: "pointer" }} key={Math.random() * Math.random()}>
            <span> {item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Analysis() {
  const arr = Array.from({ length: 200 });
  return (
    <div>
      {arr.map((item: any, index: number) => {
        return <div>{index + 1}</div>;
      })}
    </div>
  );
}

export default Analysis;

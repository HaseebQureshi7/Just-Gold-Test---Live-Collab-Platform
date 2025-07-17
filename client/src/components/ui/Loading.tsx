interface ILoading {
  scale?: number;
}

function Loading({ scale = 1 }: ILoading) {
  return <div className="loader" style={{ scale }} />;
}

export default Loading;

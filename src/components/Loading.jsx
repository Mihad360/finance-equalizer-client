import PuffLoader from "react-spinners/PuffLoader";

const Loading = () => {
  return (
    <div className="w-40 mx-auto">
      <div className="py-72">
        <PuffLoader color="#224dfc" loading={true} size={100} />
      </div>
    </div>
  );
};

export default Loading;

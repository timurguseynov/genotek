import { useState } from "react";
import axios from "axios";

const STATUS_LOADING = "loading";
const STATUS_SUCCESS = "success";
const STATUS_ERROR = "error";

function App() {
  const [data, setData] = useState({});

  const handleGetData = async () => {
    setData({ status: STATUS_LOADING });
    try {
      const response = await axios.get("http://localhost:3000/api/random");
      setData({ status: STATUS_SUCCESS, result: response.data });
    } catch (error) {
      setData({ status: STATUS_ERROR, message: error.message });
    }
  };

  return (
    <>
      <Alert status={data.status} />
      <div className="p-0 text-center bg-body-tertiary">
        <div className="container py-5">
          <h1 className="text-body-emphasis">Modern Random Data loader</h1>
          <p className="col-lg-8 mx-auto lead">
            Click the button bellow to get started!
          </p>
          <Button status={data.status} handleGetData={handleGetData} />
        </div>
      </div>
    </>
  );
}

function Alert({ status }) {
  if (status === STATUS_SUCCESS) {
    return (
      <div className="alert alert-success mb-0" role="alert">
        Successfully received data...
      </div>
    );
  } else if (status === STATUS_ERROR) {
    return (
      <div className="alert alert-danger mb-0" role="alert">
        Something went wrong...
      </div>
    );
  } else if (status === STATUS_LOADING) {
    return (
      <div className="alert alert-info mb-0" role="alert">
        Processing...
      </div>
    );
  } else {
    return (
      <div className="alert alert-primary mb-0" role="alert">
        New random data is awaiting for your clicks...
      </div>
    );
  }
}

function Button({ status, handleGetData }) {
  const inner = () => {
    if (status === STATUS_LOADING) {
      return (
        <>
          <span
            className="spinner-border spinner-border-sm"
            aria-hidden="true"
          ></span>
          <span role="status" className="ms-2">
            Loading...
          </span>
        </>
      );
    }

    return <span>Generate</span>;
  };

  return (
    <button
      onClick={handleGetData}
      className="btn btn-primary px-5 mb-5"
      type="button"
      disabled={status === STATUS_LOADING}
    >
      {inner()}
    </button>
  );
}

export default App;

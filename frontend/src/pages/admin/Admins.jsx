import { useContext, useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { AdminContext } from "../middleware/AdminContext";
import { addAdmin, adminDelete, adminUpdate } from "./control/AdminControl";
import LoadingScreen from "../../LoadingScreen";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";

const Admins = () => {
  const { admins, loading, fetchAdmins } = useContext(AdminContext);
  const [res, setRes] = useState({});
  const [toast, setToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputFields = [
    { name: "name", type: "text", label: "Name", id: "nameInput" },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      id: "emailInput",
      helpText: "We'll never share your email with anyone else.",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      id: "passwordInput",
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      id: "confirmPasswordInput",
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = admins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(admins.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <Sidebar />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <LoadingScreen />
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({
      ...adminData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addAdmin(adminData);
    setRes(response);

    if (response.status === 201) {
      setToast(true);
      setAdminData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      document.querySelector("#addAdminModal .btn-close").click();
      fetchAdmins();
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const response = await adminUpdate(adminData._id, adminData);
    setRes(response);

    if (response.status === 200) {
      setToast(true);
      setAdminData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      document.querySelector("#updateAdminModal .btn-close").click();
      fetchAdmins();
      setRes(response);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <div
                className={`toast align-items-center text-white ${
                  res.status === 200 || res.status === 201
                    ? "bg-success"
                    : "bg-danger"
                } border-0 position-fixed bottom-0 end-0 m-3 ${
                  toast ? "show" : "hide"
                }`}
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{ minWidth: "300px" }}
              >
                <div className="d-flex">
                  <div className="toast-body">
                    {res.name && '"' + res.name + '" ' + res.message}
                    {res.name && !(res.message && res.message)}
                    {res.message && res.message}
                  </div>
                  <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    aria-label="Close"
                    onClick={() => setToast(false)}
                  ></button>
                </div>
              </div>
              <h1 className="h2">Admin</h1>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addAdminModal"
              >
                Add admin
              </button>
            </div>
            <div className="table-responsive">
              <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Delete</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => (
                      <tr key={item._id}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteAdminModal"
                            value={item._id}
                            onClick={(e) => {
                              const admin = admins.find(
                                (admin) => admin._id === e.target.value
                              );
                              setAdminData(admin);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#updateAdminModal"
                            value={item._id}
                            onClick={(e) => {
                              const admin = admins.find(
                                (admin) => admin._id === e.target.value
                              );
                              setAdminData(admin);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Add Admin Modal  */}
      <Modal
        modalId="addAdminModal"
        title="Add Admin"
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formData={adminData}
        inputFields={inputFields}
      />

      {/* Admin Update Modal  */}
      <Modal
        modalId="updateAdminModal"
        title="Update Admin"
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitUpdate}
        formData={adminData}
        inputFields={inputFields}
      />

      {/* Admin Delete Modal */}
      <div
        className="modal fade"
        id="deleteAdminModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger">
              <h5 className="modal-title text-white" id="staticBackdropLabel">
                Delete Admin
              </h5>
              <button
                type="button"
                className="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the following admin?</p>
              <p>
                <strong>Name:</strong> {adminData.name}
              </p>
              <p>
                <strong>Email:</strong> {adminData.email}
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={async () => {
                  const response = await adminDelete(adminData._id);
                  setRes(response);
                  setToast(true);
                  document
                    .querySelector("#deleteAdminModal .btn-close")
                    .click();
                  fetchAdmins();
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admins;

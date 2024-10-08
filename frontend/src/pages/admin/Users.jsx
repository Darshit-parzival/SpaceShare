import { useContext, useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { UserContext } from "../middleware/UserContext";
import { addUser, userDelete, userUpdate } from "./control/UserControl";
import LoadingScreen from "../../LoadingScreen";
import Modal from "./components/Modal";
import Pagination from "./components/Pagination";

const Users = () => {
  const { users, loading, fetchUsers } = useContext(UserContext);
  const [res, setRes] = useState({});
  const [toast, setToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [userData, setUserData] = useState({
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
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

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
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addUser(userData);
    setRes(response);

    if (response.status === 201) {
      setToast(true);
      setUserData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      document.querySelector("#addUserModal .btn-close").click();
      fetchUsers();
    }
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const response = await userUpdate(userData._id, userData);
    setRes(response);

    if (response.status === 200) {
      setToast(true);
      setUserData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      document.querySelector("#updateUserModal .btn-close").click();
      fetchUsers();
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
              <h1 className="h2">User</h1>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#addUserModal"
              >
                Add user
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
                            data-bs-target="#deleteUserModal"
                            value={item._id}
                            onClick={(e) => {
                              const user = users.find(
                                (user) => user._id === e.target.value
                              );
                              setUserData(user);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-secondary"
                            data-bs-toggle="modal"
                            data-bs-target="#updateUserModal"
                            value={item._id}
                            onClick={(e) => {
                              const user = users.find(
                                (user) => user._id === e.target.value
                              );
                              setUserData(user);
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

      {/* Add User Modal  */}
      <Modal
        modalId="addUserModal"
        title="Add User"
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formData={userData}
        inputFields={inputFields}
      />

      {/* User Update Modal  */}
      <Modal
        modalId="updateUserModal"
        title="Update User"
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmitUpdate}
        formData={userData}
        inputFields={inputFields}
      />

      {/* User Delete Modal */}
      <div
        className="modal fade"
        id="deleteUserModal"
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
                Delete User
              </h5>
              <button
                type="button"
                className="btn-close bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete the following user?</p>
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
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
                  const response = await userDelete(userData._id);
                  setRes(response);
                  setToast(true);
                  document
                    .querySelector("#deleteUserModal .btn-close")
                    .click();
                  fetchUsers();
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

export default Users;

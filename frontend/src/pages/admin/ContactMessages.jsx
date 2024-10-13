import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Pagination from "./components/Pagination";
import Sidebar from "./components/Sidebar";

const ContactMessages = () => {
  const [res, setRes] = useState({}); // Response state for toast messages
  const [toast, setToast] = useState(false); // Toast visibility state
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [selectedMessageName, setSelectedMessageName] = useState("");
  const itemsPerPage = 5;

  // Calculate total pages based on the number of messages
  const totalPages = Math.ceil(messages.length / itemsPerPage);

  // Fetch messages and manage toast visibility
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/contact/fetch");
        setMessages(response.data); // Set fetched messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Manage toast visibility
    if (toast) {
      const timer = setTimeout(() => {
        setToast(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const currentItems = messages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/contact/delete/${selectedMessageId}`
      );
      setMessages(
        messages.filter((message) => message._id !== selectedMessageId)
      );

      // Set response for toast notification
      setRes({
        status: 200,
        name: selectedMessageName,
        message: "Message deleted successfully.",
      });
      setToast(true); // Show toast
      setSelectedMessageId(null);
      setSelectedMessageName("");
    } catch (error) {
      console.error("Error deleting message:", error);
      setRes({
        status: 500,
        message: "Error deleting message.",
      });
      setToast(true); // Show error toast
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
              <h1 className="h2">Contact Messages</h1>
            </div>
            <div
              className={`toast align-items-center text-white ${
                res.status === 200 ? "bg-success" : "bg-danger"
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
                  {res.message && !res.name && res.message}
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white me-2 m-auto"
                  aria-label="Close"
                  onClick={() => setToast(false)}
                ></button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-striped table-sm table-bordered">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Reply</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.message}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#replyModal"
                          value={item._id}
                          onClick={(e) => {
                            const message = messages.find(
                              (msg) => msg._id === e.target.value
                            );
                            // Handle reply logic here
                          }}
                        >
                          Reply
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => {
                            setSelectedMessageId(item._id);
                            setSelectedMessageName(item.name);
                          }}
                        >
                          Delete
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
          </main>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirm Delete
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete the message from{" "}
              <strong>{selectedMessageName}</strong>?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
                data-bs-dismiss="modal"
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

export default ContactMessages;

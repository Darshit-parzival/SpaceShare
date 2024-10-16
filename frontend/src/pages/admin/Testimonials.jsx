import { useContext, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LoadingScreen from "../../LoadingScreen";
import Pagination from "./components/Pagination";
import { UserContext } from "../middleware/UserContext";
import { TestimonialContext } from "../middleware/TestimonialContext";

// Function to group testimonials by userId
const groupTestimonialsByUser = (testimonials) => {
  return testimonials.reduce((acc, testimonial) => {
    const { userId } = testimonial;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(testimonial);
    return acc;
  }, {});
};

const Testimonials = () => {
  const { users } = useContext(UserContext);
  const { testimonials, loading, deleteTestimonial } =
    useContext(TestimonialContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Group testimonials by userId
  const groupedTestimonials = groupTestimonialsByUser(testimonials);

  const userIds = Object.keys(groupedTestimonials);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userIds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userIds.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (testimonialId) => {
    deleteTestimonial(testimonialId);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">Testimonials</h1>
            </div>

            {/* Render grouped testimonials */}
            {currentItems.map((userId, index) => {
              const user = users.find((u) => u._id === userId);
              const userTestimonials = groupedTestimonials[userId];

              return (
                <div key={index} className="mb-4">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">
                        {user ? user.name : "Unknown User"}
                      </h5>

                      <h6 className="card-subtitle mb-2 text-muted">
                        Testimonials:
                      </h6>

                      {/* Render each testimonial for the user */}
                      {userTestimonials.map((testimonial) => (
                        <div key={testimonial._id} className="mb-3">
                          <p className="card-text">{testimonial.testimonial}</p>

                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(testimonial._id)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Pagination component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </>
  );
};

export default Testimonials;

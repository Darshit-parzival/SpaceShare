import PropTypes from "prop-types";

const Modal = ({
  modalId,
  title,
  handleInputChange,
  handleSubmit,
  formData,
  inputFields,
}) => {
  return (
    <div
      className="modal fade"
      id={modalId}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary">
            <h5 className="modal-title text-white" id={`${modalId}Label`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close bg-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {inputFields.map((field, index) => (
                <div className="mb-3" key={index}>
                  <label htmlFor={field.id} className="form-label">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    className="form-control"
                    onChange={handleInputChange}
                    value={formData[field.name] || ""}
                  />
                  {field.helpText && (
                    <div className="form-text">{field.helpText}</div>
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  inputFields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      helpText: PropTypes.string,
    })
  ).isRequired,
};

export default Modal;

const OwnersList = ({ owners, spaces, searchCity }) => {
    return (
      <section className="owners_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>{searchCity}</h2>
          </div>
          <div className="row">
            {owners.length > 0 ? (
              owners.map((owner, index) => (
                <div className="col-md-6 col-lg-4 mx-auto" key={index}>
                  <div className="owner_card">
                    <div className="owner_info">
                      <h4>{owner.ownerName}</h4>
                      <p>Total Available Spaces: {owner.totalSpaces}</p>
                    </div>
                    <div className="owner_spaces">
                      <ul>
                        {spaces
                          .filter(space => space.parkingOwner === owner._id)
                          .map((space, spaceIndex) => (
                            <li key={spaceIndex}>{space.parkingCity}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No parking areas available in the searched city.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  };
export default OwnersList;
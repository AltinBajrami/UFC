import React from "react";
import customFetch from "../../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Ranked = () => {
  const [ranked, setRanked] = React.useState([]);

  React.useEffect(() => {
    const fetchRanked = async () => {
      try {
        const response = await customFetch.get("/ranked", {
          withCredentials: true,
        });
        if (response.status === 200) {
          const fetchedRanked = response.data.ranked;
          console.log("Fetched ranked:", fetchedRanked);
          setRanked(fetchedRanked); // Set ranked data directly
        } else {
          toast.error("Failed to fetch ranked");
        }
      } catch (error) {
        console.error("Error fetching ranked:", error);
        toast.error("Failed to fetch ranked");
      }
    };

    fetchRanked();
  }, []);

  const handleDelete = async (id) => {
    try {
      await customFetch.delete("/ranked/" + id);
      toast.success("Deleted ranked");
      // Instead of reloading the page, update the state directly
      setRanked((prevRanked) => prevRanked.filter((rank) => rank._id !== id));
    } catch (error) {
      console.error("Error deleting ranked:", error);
      toast.error("Failed to delete ranked");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 bg-white rounded p-3">
        <Link to="/ranked/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Weight Class</th>
              <th>Champion</th>
              <th>Rank 1</th>
              <th>Rank 2</th>
              <th>Rank 3</th>
              <th>Rank 4</th>
              <th>Rank 5</th>
              <th>Rank 6</th>
              <th>Rank 7</th>
              <th>Rank 8</th>
              <th>Rank 9</th>
              <th>Rank 10</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((rank) => (
              <tr key={rank._id}>
                <td>{rank.weightClass.className}</td>
                <td>
                  {rank.champion
                    ? `${rank.champion.fighterName} (${rank.champion.nickName})`
                    : "N/A"}
                </td>
                {/* Loop through all ranks */}
                {[...Array(10).keys()].map((i) => (
                  <td key={i}>
                    {rank[`rank${i + 1}`]
                      ? `${rank[`rank${i + 1}`].fighterName} (${rank[`rank${i + 1}`].nickName})`
                      : "N/A"}
                  </td>
                ))}
                <td>
                  <Link
                    to={`/ranked/update/${rank._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(rank._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranked;

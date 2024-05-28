import React from "react";
import customFetch from "../../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Fights = () => {
  const [fights, setFights] = React.useState([]);

  React.useEffect(() => {
    const fetchFights = async () => {
      try {
        const response = await customFetch.get("/fights", {
          withCredentials: true,
        });
        if (response.status === 200) {
          const fetchedFights = response.data.fights;
          // Fetch details of fighter1, fighter2, winner, and finish for each fight
          const promises = fetchedFights.map(async (fight) => {
            const fighter1Response = await customFetch.get(
              `/fighters/${fight.fighter1ID}`,
            );
            const fighter2Response = await customFetch.get(
              `/fighters/${fight.fighter2ID}`,
            );
            const winnerResponse = await customFetch.get(
              `/fighters/${fight.winnerID}`,
            );
            const finishResponse = await customFetch.get(
              `/fightFinish/${fight.finishID}`,
            );
            fight.fighter1 = fighter1Response.data;
            fight.fighter2 = fighter2Response.data;
            fight.winner = winnerResponse.data;
            fight.finish = finishResponse.data;
            return fight;
          });
          const updatedFights = await Promise.all(promises);
          setFights(updatedFights);
        } else {
          toast.error("Failed to fetch fights");
        }
      } catch (error) {
        console.error("Error fetching fights:", error);
        toast.error("Failed to fetch fights");
      }
    };

    fetchFights();
  }, []);

  console.log(fights);

  const handleDelete = async (id) => {
    try {
      await customFetch.delete("/fights/" + id);
      toast.success("Deleted fight");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting fight:", error);
      toast.error("Failed to delete fight");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 bg-white rounded p-3">
        <Link to="/fights/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Fighter 1</th>
              <th>Fighter 2</th>
              <th>Winner</th>
              <th>Round</th>
              <th>Time</th>
              <th>Finish Type</th>
              <th>Referee ID</th>
              <th>Mini Event ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fights.map((fight, index) => (
              <tr key={index}>
                <td>
                  {fight.fighter1
                    ? `${fight.fighter1.fighter.fighterName} (${fight.fighter1.fighter.nickName})`
                    : "N/A"}
                </td>
                <td>
                  {fight.fighter2
                    ? `${fight.fighter2.fighter.fighterName} (${fight.fighter2.fighter.nickName})`
                    : "N/A"}
                </td>
                <td>
                  {fight.winner
                    ? `${fight.winner.fighter.fighterName} (${fight.winner.fighter.nickName})`
                    : "N/A"}
                </td>
                <td>{fight.round}</td>
                <td>{fight.time}</td>
                <td>
                  {fight.finish
                    ? `${fight.finish.fightFinish.finishType} (${fight.finish.fightFinish.description})`
                    : "N/A"}
                </td>
                <td>{fight.refereeID || "N/A"}</td>
                <td>{fight.miniEventID || "N/A"}</td>
                <td>
                  <Link
                    to={`/fights/update/${fight._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(fight._id)}
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

export default Fights;

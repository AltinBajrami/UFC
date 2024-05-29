import React from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from "react-toastify";

const CreateFight = () => {
  const [fighter1ID, setFighter1ID] = React.useState("");
  const [fighter2ID, setFighter2ID] = React.useState("");
  const [winnerID, setWinnerID] = React.useState("");
  const [round, setRound] = React.useState("");
  const [time, setTime] = React.useState("");
  const [finishID, setFinishID] = React.useState("");
  // const [refereeID, setRefereeID] = React.useState("");
  // const [miniEventID, setMiniEventID] = React.useState("");

  const [fighters, setFighters] = React.useState([]);
  const [fightFinishs, setFightFinishs] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    // Fetch fighters and fight finishes...

    const fetchFighters = async () => {
      try {
        const response = await customFetch("/fighters");
        if (response.status === 200) {
          setFighters(response.data.fighters);
        } else {
          toast.error("Failed to fetch fighters");
        }
      } catch (error) {
        console.error("Error fetching fighters:", error);
        toast.error("Failed to fetch fighters");
      }
    };

    const fetchFightFinishs = async () => {
      try {
        const response = await customFetch("/fightFinish");
        if (response.status === 200) {
          setFightFinishs(response.data.fightFinishs);
        } else {
          toast.error("Failed to fetch fight finishes");
        }
      } catch (error) {
        console.error("Error fetching fight finishes:", error);
        toast.error("Failed to fetch fight finishes");
      }
    };

    fetchFighters();
    fetchFightFinishs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fighter1ID,
        fighter2ID,
        winnerID,
        round,
        time,
        finishID,
      };

      const { data } = await customFetch.post("/fights", payload);

      console.log(data);

      // Redirect after successful submission
      navigate("/fights");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
    }
  };

  return (
    <div className="d-flex vh-50 bg-primary justify-content-center align-items-center p-5">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Add Fight</h2>
          <div className="mb-2">
            <label htmlFor="">Fighter 1</label>
            <select
              className="form-control"
              value={fighter1ID}
              onChange={(e) => setFighter1ID(e.target.value)}
              required
            >
              <option value="">Select Fighter 1</option>
              {fighters.map((fighter) => (
                <option key={fighter._id} value={fighter._id}>
                  {fighter.fighterName} ({fighter.nickName})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Fighter 2</label>
            <select
              className="form-control"
              value={fighter2ID}
              onChange={(e) => setFighter2ID(e.target.value)}
              required
            >
              <option value="">Select Fighter 2</option>
              {fighters.map((fighter) => (
                <option key={fighter._id} value={fighter._id}>
                  {fighter.fighterName} ({fighter.nickName})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Winner</label>
            <select
              className="form-control"
              value={winnerID}
              onChange={(e) => setWinnerID(e.target.value)}
              required
            >
              <option value="">Select Winner</option>
              {fighters.map((fighter) => (
                <option key={fighter._id} value={fighter._id}>
                  {fighter.fighterName} ({fighter.nickName})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="">Round</label>
            <input
              type="number"
              placeholder="Enter Round"
              required
              className="form-control"
              value={round}
              onChange={(e) => setRound(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Time</label>
            <input
              type="text"
              placeholder="Enter Time"
              required
              className="form-control"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Fight Finish</label>
            <select
              className="form-control"
              value={finishID}
              onChange={(e) => setFinishID(e.target.value)}
              required
            >
              <option value="">Select Finish Type</option>
              {fightFinishs.map((fightFinish) => (
                <option key={fightFinish._id} value={fightFinish._id}>
                  {fightFinish.finishType} ({fightFinish.description})
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFight;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from "react-toastify";

const UpdateFight = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fighters, setFighters] = useState([]);
  const [fightFinishs, setFightFinishs] = useState([]);

  const [fighter1ID, setFighter1ID] = useState("");
  const [fighter2ID, setFighter2ID] = useState("");
  const [winnerID, setWinnerID] = useState("");
  const [round, setRound] = useState("");
  const [time, setTime] = useState("");
  const [finishID, setFinishID] = useState("");

  useEffect(() => {
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

    const fetchFight = async () => {
      try {
        const response = await customFetch(`/fights/${id}`);
        if (response.status === 200) {
          const { fighter1ID, fighter2ID, winnerID, round, time, finishID } =
            response.data.fight;
          setFighter1ID(fighter1ID);
          setFighter2ID(fighter2ID);
          setWinnerID(winnerID);
          setRound(round);
          setTime(time);
          setFinishID(finishID);
        } else {
          toast.error("Failed to fetch fight");
        }
      } catch (error) {
        console.error("Error fetching fight:", error);
        toast.error("Failed to fetch fight");
      }
    };

    fetchFighters();
    fetchFightFinishs();
    fetchFight();
  }, [id]);

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

      const { data } = await customFetch.patch(`/fights/${id}`, payload);

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
          <h2>Update Fight</h2>
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFight;

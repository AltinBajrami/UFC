import React from "react";
import { useNavigate } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from "react-toastify";

const CreateRanked = () => {
  const [weightClasses, setWeightClasses] = React.useState([]);
  const [selectedWeightClass, setSelectedWeightClass] = React.useState("");
  const [champion, setChampion] = React.useState("");
  const [rankedFighters, setRankedFighters] = React.useState({});
  const [fighters, setFighters] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getAllWeightClasses();
    fetchFighters();
  }, []);

  const getAllWeightClasses = async () => {
    try {
      const { data } = await customFetch("/weightClasses", {
        withCredentials: true,
      });
      setWeightClasses(data?.weightClasses);
    } catch (error) {
      console.error("Error fetching weight classes:", error);
      setWeightClasses([]);
    }
  };

  const fetchFighters = async () => {
    try {
      const { data } = await customFetch("/fighters", {
        withCredentials: true,
      });
      setFighters(data?.fighters);
    } catch (error) {
      console.error("Error fetching fighters:", error);
      setFighters([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        weightClass: selectedWeightClass,
        champion: champion || null,
        ...rankedFighters,
      };

      console.log(formData);

      await customFetch.post("/ranked", formData);
      toast.success("Ranked fighters created successfully");
      navigate("/ranked");
    } catch (error) {
      console.error("Error creating ranked fighters:", error);
      toast.error("Failed to create ranked fighters");
    }
  };

  const handleRankChange = (rank, fighterId) => {
    setRankedFighters((prevState) => ({
      ...prevState,
      [rank]: fighterId,
    }));
  };

  return (
    <div className="d-flex vh-50 bg-primary justify-content-center align-items-center p-5">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit}>
          <h2>Create Ranked Fighters</h2>
          <div className="mb-2">
            <label htmlFor="weightClass">Select Weight Class</label>
            <select
              name="weightClass"
              value={selectedWeightClass}
              className="form-select"
              onChange={(e) => setSelectedWeightClass(e.target.value)}
            >
              <option value="">Select Weight Class</option>
              {weightClasses.map((weightClass) => (
                <option key={weightClass._id} value={weightClass._id}>
                  {weightClass.className}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="champion">Champion</label>
            <select
              className="form-select"
              value={champion}
              onChange={(e) => setChampion(e.target.value)}
            >
              <option value="">Select Champion</option>
              {fighters.map((fighter) => (
                <option key={fighter._id} value={fighter._id}>
                  {fighter.fighterName} ({fighter.nickName})
                </option>
              ))}
            </select>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => (
            <div key={rank} className="mb-2">
              <label htmlFor={`rank${rank}`}>Rank {rank}</label>
              <select
                className="form-select"
                value={rankedFighters[`rank${rank}`] || ""}
                onChange={(e) =>
                  handleRankChange(`rank${rank}`, e.target.value)
                }
              >
                <option value="">Select Fighter</option>
                {fighters.map((fighter) => (
                  <option key={fighter._id} value={fighter._id}>
                    {fighter.fighterName} ({fighter.nickName})
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button type="submit" className="btn btn-success">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRanked;

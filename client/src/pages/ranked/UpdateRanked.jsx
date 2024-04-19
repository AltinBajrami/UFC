import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from "react-toastify";

const UpdateRanked = () => {
  const { id } = useParams();
  const [weightClasses, setWeightClasses] = useState([]);
  const [selectedWeightClass, setSelectedWeightClass] = useState("");
  const [champion, setChampion] = useState("");
  const [rankedFighters, setRankedFighters] = useState({});
  const [fighters, setFighters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRankedData();
    getAllWeightClasses();
    fetchFighters();
  }, []);

  const getRankedData = async () => {
    try {
      const { data } = await customFetch(`/ranked/${id}`, {
        withCredentials: true,
      });
      const rankedData = data.ranked;
      setSelectedWeightClass(rankedData.weightClass?._id || "");
      setChampion(rankedData.champion?._id || "");
      setRankedFighters({
        rank1: rankedData.rank1?._id || "",
        rank2: rankedData.rank2?._id || "",
        rank3: rankedData.rank3?._id || "",
        rank4: rankedData.rank4?._id || "",
        rank5: rankedData.rank5?._id || "",
        rank6: rankedData.rank6?._id || "",
        rank7: rankedData.rank7?._id || "",
        rank8: rankedData.rank8?._id || "",
        rank9: rankedData.rank9?._id || "",
        rank10: rankedData.rank10?._id || "",
      });
    } catch (error) {
      console.error("Error fetching ranked data:", error);
      toast.error("Failed to fetch ranked data");
    }
  };

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
      // Filter out empty ranks from rankedFighters
      const filteredRankedFighters = Object.entries(rankedFighters).reduce(
        (acc, [key, value]) => {
          if (value !== "") {
            acc[key] = value;
          }
          return acc;
        },
        {},
      );

      const formData = {
        weightClass: selectedWeightClass,
        champion: champion || null,
        ...filteredRankedFighters,
      };

      console.log(formData);

      await customFetch.patch(`/ranked/${id}`, formData);
      toast.success("Ranked fighters updated successfully");
      navigate("/ranked");
    } catch (error) {
      console.error("Error updating ranked fighters:", error);
      toast.error("Failed to update ranked fighters");
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
          <h2>Update Ranked Fighters</h2>
          <div className="mb-2">
            <label htmlFor="weightClass">Select Weight Class</label>
            <select
              name="weightClass"
              value={selectedWeightClass}
              className="form-select"
              onChange={(e) => setSelectedWeightClass(e.target.value)}
            >
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
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRanked;

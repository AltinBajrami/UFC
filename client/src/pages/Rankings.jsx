import React from "react";
import styled from "styled-components";
import customFetch from "../utils";
import { toast } from "react-toastify";

const Rankings = () => {
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

  return (
    <div>
      <Title>ATHLETE RANKINGS</Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Banner
          src="https://tpc.googlesyndication.com/simgad/945640650811365436"
          alt="Banner"
        />
      </div>
      <Container>
        <RankingsContainer>
          {ranked.map((rank) => (
            <div key={rank._id}>
              <WeightClass>{rank.weightClass.className}</WeightClass>
              <Champion>
                {rank.champion ? `${rank.champion.fighterName}` : "N/A"}
                <span
                  style={{
                    color: "#abadb1",
                    fontSize: "10px",
                    textTransform: "uppercasse",
                    display: "block",
                    marginTop: "5px",
                  }}
                >
                  Champion
                </span>
                {rank.champion.image1 ? (
                  <img
                    src={`http://localhost:5111${rank.champion.image1}`}
                    alt="Champion"
                    width="250"
                  />
                ) : (
                  <img
                    src="http://localhost:5111/uploads/fighters/no-profile-image.png"
                    alt="Champion"
                  />
                )}
              </Champion>
              {/* Loop through all ranks */}
              {[...Array(10).keys()].map((i) => (
                <AthletesRows key={i}>
                  {rank[`rank${i + 1}`] ? (
                    <>
                      <span>{i + 1} </span>
                      <a href="#">{rank[`rank${i + 1}`].fighterName}</a>
                    </>
                  ) : (
                    `N/A`
                  )}
                </AthletesRows>
              ))}
            </div>
          ))}
        </RankingsContainer>
      </Container>
    </div>
  );
};

export default Rankings;

const Container = styled.div`
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 60px;
  font-size: 60px;
  line-height: 60px;
  font-weight: 700;
`;

const Champion = styled.div`
  font-weight: bold;
  color: #191919;
  text-transform: uppercase;
  font-size: 18px;
  border-bottom: 1px solid #e5e5e5;
  margin-bottom: 30px;
`;

const Banner = styled.img`
  width: 100%;
  margin-bottom: 30px;
  margin-left: 10%;
  margin-right: 10%;
`;
const RankingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 250px));
  place-content: center;
  gap: 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 250px);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 250px);
  }

  @media (max-width: 600px) {
    grid-template-columns: 250px;
  }
`;

const WeightClass = styled.div`
  color: rgb(210, 10, 10);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const AthletesRows = styled.div`
  height: 36px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px;

  span {
    width: 35px;
    color: #191919;
    font-weight: bold;
    font-size: 14px;
  }
  a {
    color: rgb(88, 91, 99);
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
  }

  &:hover {
    background-color: #e5e5e5;
  }
`;

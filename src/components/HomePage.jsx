import React from "react";
import "./HomePage.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchData } from "../action";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { data } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    description: "",
    location: "",
  });
  useEffect(() => {
    dispatch(fetchData(localStorage.getItem("access_token")));
  }, []);

  const changeInput = (e) => {
    let { name, value } = e.target;
    const newData = {
      ...filter,
    };
    newData[name] = value;
    setFilter(newData);
  };

  const getDetailJob = (data) => {
    dispatch({
      type: "jobs/detail",
      data,
    });
    navigate("/detail");
  };

  const searchJob = () => {
    console.log(filter.description);
    console.log(filter.location);
    dispatch(
      fetchData(
        localStorage.getItem("access_token"),
        filter.description,
        filter.location
      )
    );
  };
  return (
    <>
      <div className="bg-home">
        <div className="search-section">
          <div>
            <p className="text-title text-white">Job Description</p>
            <input
              name="description"
              type="text"
              className="input search-area"
              placeholder="Filter by title, benefits, companies, expertise"
              value={filter.description}
              onChange={(e) => changeInput(e)}
            />
          </div>
          <div>
            <p className="text-title text-white">Location</p>
            <input
              name="location"
              type="text"
              className="input search-area"
              placeholder="Filter by city, state, zip, code or country"
              value={filter.location}
              onChange={(e) => changeInput(e)}
            />
          </div>
          <div>
            <input type="checkbox" name="" id="" className="input" />
            <label htmlFor="" className="input text-white">
              Full Time
            </label>
          </div>
          <button className="btn-search" onClick={() => searchJob()}>
            Search
          </button>
        </div>
        <div className="jobs">
          <h1 className="title">Job List</h1>
          {data.result &&
            data.result.map((e, idx) => {
              return (
                <div key={idx} className="job" onClick={() => getDetailJob(e)}>
                  <div className="job-content">
                    <div className="left-content">
                      <p>{e.title}</p>
                      <div className="detail">
                        <p>{e.company}</p>
                        <p>-</p>
                        <p className="job-type">{e.type}</p>
                      </div>
                    </div>
                    <div className="right-content">
                      <p>{e.location}</p>
                    </div>
                  </div>
                  <hr className="line" />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default HomePage;

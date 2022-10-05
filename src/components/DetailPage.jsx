import React from "react";
import "./DetailPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function DetailPage() {
  const { detailJob } = useSelector((state) => state);
  const navigate = useNavigate();
  return (
    <>
      <button className="btn-back" onClick={() => navigate("/")}>
        Back
      </button>
      {detailJob && (
        <div>
          <div className="section-detail">
            <div className="left-content-detail">
              <p>
                {detailJob.type} / {detailJob.location}
              </p>
              <h1>{detailJob.title}</h1>
              <td dangerouslySetInnerHTML={{ __html: detailJob.description }} />
            </div>
            <div className="right-content-detail">
              <div className="card-image">
                <div className="card-title">
                  <h5>{detailJob.company}</h5>
                  <p>1 other job</p>
                </div>
                <img
                  src="https://cdn.freebiesupply.com/logos/large/2x/random-logo-png-transparent.png"
                  className="image"
                  alt=""
                />
              </div>
              <div className="apply">
                <h4>How To Apply</h4>
                <td
                  dangerouslySetInnerHTML={{ __html: detailJob.how_to_apply }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailPage;

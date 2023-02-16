import React from 'react';
import './style.css';

function JobCard(props) {
  return (
    <div className="card">
      <h2 className="job-title">{props.jobTitle}</h2>
      <h3 className="company-name">{props.companyName}</h3>
      <p className="job-description">{props.jobDesc}</p>
      <p className="date-posted">{props.datePosted}</p>
      <p className="job-location">{props.jobLocation}</p>
    </div>
  );
}

export default JobCard;
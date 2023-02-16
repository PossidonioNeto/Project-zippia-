import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecentJobs, setShowRecentJobs] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.post('https://www.zippia.com/api/jobs/', {
        companySkills: true,
        dismissedListingHashes: [],
        fetchJobDesc: true,
        jobTitle: 'Analista de Negócios',
        locations: [],
        numJobs: 20,
        previousListingHashes: []
      });
      setJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showRecentJobs) {
      const date = new Date();
      date.setDate(date.getDate() - 7);
      const filtered = jobs.filter(job => new Date(job.OBJpostingDate) > date);
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [jobs, showRecentJobs]);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    const filtered = jobs.filter(
      job =>
        job.jobTitle.toLowerCase().includes(e.target.value.toLowerCase()) ||
        job.companyName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div>
      <h1>Job Listings</h1>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by title or company" />
      <div>
        <button onClick={() => setFilteredJobs(jobs)}>All Jobs</button>
        <button onClick={() => setShowRecentJobs(!showRecentJobs)}>
          {showRecentJobs ? 'All Jobs' : 'Recent Jobs'}
        </button>
      </div>
      <div className="card-container">
        {filteredJobs.slice(0, 10).map(job => (
          <Card key={job.jobId} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
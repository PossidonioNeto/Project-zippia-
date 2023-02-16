import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobCard from './components/JobCard';
import './styles.css';

function App() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get('https://www.zippia.com/api/jobs/', {
          params: {
            companySkills: 'ruby-on-rails',
            page: 1,
            per_page: 10,
          },
        });

        setJobs(response.data.jobs);
        setFilteredJobs(response.data.jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    fetchJobs();
  }, []);

  function handleFilterByCompany(companyName) {
    if (!jobs) return;
    const filtered = jobs.filter((job) => job.companyName === companyName);
    setFilteredJobs(filtered);
  }

  function handleFilterByLast7Days() {
    if (!jobs) return;
    const filtered = jobs.filter((job) => {
      const jobDate = new Date(job.OBJpostingDate);
      const currentDate = new Date();
      const timeDiff = Math.abs(currentDate.getTime() - jobDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return diffDays <= 7;
    });
    setFilteredJobs(filtered);
  }

  async function isFeatureSupported(feature) {
    const result = await navigator.userAgentData.getHighEntropyValues([feature]);
    return !!result[feature];
  }

  async function handleFilterByBrowser() {
    const isChrome101OrLater = await isFeatureSupported('platform');
    if (isChrome101OrLater) {
      console.log('This is Chrome 101 or later.');
    } else {
      console.log('This is not Chrome 101 or later.');
    }
  }

  return (
    <div className="App">
      <h1>Zippia Jobs</h1>
      <div className="filters">
        <button onClick={() => handleFilterByCompany('Google')}>
          Filter by Google
        </button>
        <button onClick={handleFilterByLast7Days}>
          Filter by last 7 days
        </button>
        <button onClick={handleFilterByBrowser}>
          Check Chrome version
        </button>
      </div>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job.jobId}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              jobDesc={job.jobDesc}
            />
          ))
        ) : (
          <p>{jobs.length ? 'No jobs match your filters.' : 'Loading...'}</p>
        )}
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [lastWeek, setLastWeek] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post(
        "https://www.zippia.com/api/jobs/",
        {
          companySkills: true,
          dismissedListingHashes: [],
          fetchJobDesc: true,
          jobTitle: "Analista de Negócios",
          locations: [],
          numJobs: 20,
          previousListingHashes: []
        }
      );
      setJobs(result.data.jobs.slice(0, 10));
    };
    fetchData();
  }, []);

  const filteredJobs = jobs.filter(job => {
    if (companyName === "") {
      return true;
    } else {
      return job.companyName === companyName;
    }
  });

  const filteredJobs2 = lastWeek
    ? filteredJobs.filter(job => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return new Date(job.OBJpostingDate) > oneWeekAgo;
      })
    : filteredJobs;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

  return (
    <div>
      <h1>Trabalhos</h1>
      <div>
        <button onClick={() => setCompanyName("")}>Todos</button>
        <button onClick={() => setCompanyName("Google")}>Google</button>
        <button onClick={() => setCompanyName("Facebook")}>Facebook</button>
      </div>
      <div>
        <button onClick={() => setLastWeek(false)}>Todos os tempos</button>
        <button onClick={() => setLastWeek(true)}>Última semana</button>
      </div>
      <Slider {...settings}>
        {filteredJobs2.map(job => (
          <div key={job.OBJjobId}>
            <h3>{job.jobTitle}</h3>
            <p>{job.companyName}</p>
            <p>{job.jobDesc}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default JobsPage;
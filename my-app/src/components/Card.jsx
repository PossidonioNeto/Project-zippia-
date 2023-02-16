import React from 'react';

function Card(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.jobTitle || ''}</p>
      <p>{props.age || ''}</p>
    </div>
  );
}

export default Card;
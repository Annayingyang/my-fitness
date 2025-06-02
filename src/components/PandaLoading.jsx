import React from 'react';
import './PandaLoading.css';

function PandaLoading() {
  return (
    <div className="panda-loader-wrapper">
      <img
        src="/images/panda-loading.gif"
        alt="Loading Panda"
        className="panda-img"
      />
      <p>Loading your wellness world...</p>
    </div>
  );
}

export default PandaLoading;

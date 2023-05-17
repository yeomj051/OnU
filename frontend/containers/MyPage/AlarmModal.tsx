import React, { useState, useEffect } from 'react';

const AlarmModal = () => {
  return (
    <div className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          Congratulations random Internet user!
        </h3>
        <p className="py-4">
          You've been selected for a chance to get one year of
          subscription to use Wikipedia for free!
        </p>
        <div className="modal-action">
          <button
            className="btn"
            onClick={() => setIsModalOpen(false)}
          >
            Yay!
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmModal;

import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div>
              <div class="row">
                <div class="column">
                  <h2 class="white-text">Current type</h2>
                  <p class="white-text">A/C</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Fast charge</h2>
                  <p class="white-text">Yes</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Amps</h2>
                  <p class="white-text">140 A</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Voltage</h2>
                  <p class="white-text">220 V</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Power</h2>
                  <p class="white-text">340 kW</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Operational</h2>
                  <p class="white-text">Yes</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Points</h2>
                  <p class="white-text">45</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Level</h2>
                  <p class="white-text">Level 3</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Connection name</h2>
                  <p class="white-text">IIRC</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Pay at location</h2>
                  <p class="white-text">Yes</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Membership required</h2>
                  <p class="white-text">Yes</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Access key required</h2>
                  <p class="white-text">No</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Last verified</h2>
                  <p class="white-text">2022-05-14</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Area</h2>
                  <p class="white-text">Hochalega</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Town</h2>
                  <p class="white-text">Montreal</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Province/State</h2>
                  <p class="white-text">Quebec</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Country</h2>
                  <p class="white-text">Canada</p>
                </div>
                <div class="column">
                  <h2 class="white-text">Contact</h2>
                  <p class="white-text">himel@gmail.com</p>
                </div>
              </div>
            </div>











            <button className="close-modal" onClick={toggleModal}>
              Close
            </button>
          </div>

        </div>

      )}
    </>
  );
}

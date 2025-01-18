import React from 'react';
import axios from 'axios';
import { getHobbiesData } from '../controllers/GeminiController';

function HobbiesSurvey({
  hobby,
  hobbies,
  setHobby,
  setHobbies,
  categorizedHobbies,
  setCategorizedHobbies,
  setShowHobbies,
  setShowDayPlanner
}) {
  // Function to add hobby
  const handleAddHobby = (e) => {
    e.preventDefault();
    if (hobby) {
      setHobbies([...hobbies, { id: Date.now(), name: hobby }]);
      setHobby('');
    }
  };

  // Function to remove hobby
  const handleRemoveHobby = (id) => {
    const updatedHobbies = hobbies.filter((hobby) => hobby.id !== id);
    setHobbies(updatedHobbies);
  };

  // Submit hobbies
  const handleSubmitHobbies = () => {
    const res = getHobbiesData(hobbies);
    console.log(res);
    setShowHobbies(false);
    setShowDayPlanner(true);
  };

  return (
    <div className="container mt-5 vw-100">
      <div className="row justify-content-center w-100">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="mb-0">De-Stressing Activities</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleAddHobby}>
                <div className="mb-3">
                  <label htmlFor="hobby" className="form-label">
                    Add an activity to de-stress
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="hobby"
                    value={hobby}
                    onChange={(e) => setHobby(e.target.value)}
                    placeholder="Enter your activity"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Add More
                </button>
              </form>

              {hobbies.length > 0 && (
                <div className="mt-4">
                  <h3>Hobbies List:</h3>
                  <ul className="list-group mb-3">
                    {hobbies.map((h) => (
                      <li key={h.id} className="list-group-item d-flex justify-content-between">
                        {h.name}
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveHobby(h.id)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-success w-100"
                    onClick={handleSubmitHobbies}
                  >
                    Submit All
                  </button>
                </div>
              )}

              {Object.values(categorizedHobbies).some((list) => list.length > 0) && (
                <div className="mt-4">
                  <h3>Categories of Your Hobbies:</h3>
                  <p>
                    <i>Disclaimer: Gemini AI categorized your hobbies.</i>
                  </p>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Harmful</th>
                        <th>Reasonable</th>
                        <th>Excellent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {categorizedHobbies.Harmful.map((hobby, idx) => (
                            <div key={idx}>{hobby}</div>
                          ))}
                        </td>
                        <td>
                          {categorizedHobbies.Reasonable.map((hobby, idx) => (
                            <div key={idx}>{hobby}</div>
                          ))}
                        </td>
                        <td>
                          {categorizedHobbies.Excellent.map((hobby, idx) => (
                            <div key={idx}>{hobby}</div>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HobbiesSurvey;

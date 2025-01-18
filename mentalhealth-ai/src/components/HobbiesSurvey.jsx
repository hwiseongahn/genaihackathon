import React, { useState } from 'react';
import axios from 'axios';

function HobbiesSurvey() {
  const [hobby, setHobby] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [categorizedHobbies, setCategorizedHobbies] = useState({
    Harmful: [],
    Reasonable: [],
    Excellent: [],
  });

  const handleAddHobby = (e) => {
    e.preventDefault();
    if (hobby) {
      setHobbies([...hobbies, { id: Date.now(), name: hobby }]);
      setHobby('');
    }
  };

  const handleSubmitAll = () => {
    const hobbyNames = hobbies.map((h) => h.name).join('\n');
    const prompt = `
      I will give you a list of hobbies in this format:

      Hobbies:

      1) Hobby 1
      2) Hobby 2
      3) Hobby 3
      etc...

      Your task is to return a JSON object in the form:

      {
          "Harmful": ["..."],
          "Reasonable": ["..."],
          "Excellent": ["..."]
      }

      If there are any harmful activities, replace them with non-harmful alternatives related to the other hobbies.

      Here's the hobbies:

      ${hobbyNames}
    `;

    axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }
      )
      .then((res) => {
        const result = JSON.parse(res.data.candidates[0].content.parts[0].text);
        setCategorizedHobbies(result);
      })
      .catch((err) => {
        console.error('Error categorizing hobbies:', err);
      });
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
                      <li key={h.id} className="list-group-item">
                        {h.name}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="btn btn-success w-100"
                    onClick={handleSubmitAll}
                  >
                    Submit All
                  </button>
                </div>
              )}

              {Object.values(categorizedHobbies).some((list) => list.length > 0) && (
                <div className="mt-4">
                  <h3>Categories of Your Hobbies:</h3>
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

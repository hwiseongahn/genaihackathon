import React from 'react';
import axios from 'axios';

function HobbiesSurvey({
  hobby,
  hobbies,
  setHobby,
  setHobbies,
  categorizedHobbies,
  setCategorizedHobbies,
}) {
  const handleAddHobby = (e) => {
    e.preventDefault();
    if (hobby) {
      setHobbies([...hobbies, { id: Date.now(), name: hobby }]);
      setHobby('');
    }
  };

  const handleSubmitAll = () => {
    if (hobbies.length === 0) {
      alert('Please add at least one hobby before submitting.');
      return;
    }

    const hobbyNames = hobbies.map((h) => h.name).join('\n');

    axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
          import.meta.env.VITE_API_KEY
        }`,
        {
          contents: [
            {
              parts: [{ text: `I will give you a list of hobbies in this format:

Hobbies:

1) Hobby 1

2) Hobby 2

3) Hobby 3

etc...


Your task is to return a JSON object in the form:


{

    {

        "hobbyName":"..."

    }

    {

        "hobbyName":"..."

    }

    {

        "hobbyName":"..."

    }

    ...

}


If there are any harmful activities the user inputs, you should replace them with non-harmful activities in your response that are maybe related to the other non-harmful activities the user provided.


IMPORTANT: Your response should ONLY contain a JSON object. DO NOT INCLUDE ANY OTHER TEXT IN YOUR RESPONSE


Here's the hobbies:

${hobbyNames}
` }],
            },
          ],
        }
      )
      .then((res) => {
        console.log('API Response:', res.data);
        const result = JSON.parse(res.data.candidates[0].content.parts[0].text);
        setCategorizedHobbies(result);
      })
      .catch((err) => {
        console.error('Error categorizing hobbies:', err);
        alert('There was an error processing your request. Please try again later.');
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

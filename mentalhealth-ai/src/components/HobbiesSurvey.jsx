import React, { useState } from "react";
import axios from "axios";
import { getHobbiesData } from "../controllers/GeminiController";
import { FaTrashAlt } from "react-icons/fa";

function HobbiesSurvey({
    hobby,
    hobbies,
    setHobby,
    setHobbies,
    categorizedHobbies,
    setShowHobbies,
    setShowDayPlanner,
    setFilteredHobbies,
}) {
    const [rawResponse, setRawResponse] = useState("");

    async function SuggestHobby(hobbies, setRawResponse) {
        const res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
                import.meta.env.VITE_API_KEY_HWI
            }`,
            {
                contents: [
                    {
                        parts: [
                            {
                                text: `Suggest me one hobby based on these hobbies, don't explain anything, just give me the hobby: ${getHobbyPromptString(hobbies)}`,
                            },
                        ],
                    },
                ],
            }
        );
        const raw_response = res.data.candidates[0].content.parts[0].text;
        setRawResponse(raw_response);
        AddSuggestedHobby(raw_response);
        setRawResponse("");
    }
    
    function AddSuggestedHobby(rawResponse) {
        setHobbies([...hobbies, { id: Date.now(), name: rawResponse }]);
        setHobby("");
    }
    
    const getHobbyPromptString = (hobbies) => {
        console.log(hobbies.hobby);
        let prompt = "";
        let index = 1;
        hobbies.forEach((hobby) => {
            console.log(hobby.name);
            prompt += `${index}) ${hobby.name} \n`;
            index++;
        });
        return prompt;
    };

    const handleAddHobby = (e) => {
        e.preventDefault();
        if (hobby) {
            setHobbies([...hobbies, { id: Date.now(), name: hobby }]);
            setHobby("");
        }
    };

    const handleSubmitHobbies = () => {
        getHobbiesData(hobbies, setFilteredHobbies);
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
                                <div className="d-flex justify-content-between">
                                    <button type="submit" className="btn btn-primary col-md-8">
                                        Add Hobby
                                    </button>
                                    <button
                                    onClick={() => SuggestHobby(hobbies, setRawResponse)}
                                    className="btn btn-primary col-md-3"
                                    >
                                        Find Hobby Suggestions!
                                    </button>
                                </div>
                            </form>
                            

                            {rawResponse && (
                                <div className="mt-4">
                                    <h3>Suggested Hobby:</h3>
                                    <p>{rawResponse}</p>
                                </div>
                            )}

                            {hobbies.length > 0 && (
                                <div className="mt-4">
                                    <h3>Hobbies List:</h3>
                                    <ul className="list-group mb-3">
                                        {hobbies.map((h) => (
                                            <li key={h.id} className="list-group-item">
                                                <div className="d-flex justify-content-between">
                                                    <p>{h.name}</p>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() =>
                                                            setHobbies(
                                                                hobbies.filter((hobby) => hobby.id !== h.id)
                                                            )
                                                        }
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
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

                            {Object.values(categorizedHobbies).some(
                                (list) => list.length > 0
                            ) && (
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

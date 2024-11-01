import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

const ResumeMaker = () => {
  const fixedFieldsRef = useRef([]);
  const dynamicFieldsRef = useRef([]);

  const [fixedFields, setFixedFields] = useState([
    { label: "Name", value: "" },
    { label: "Matric Number", value: "" },
    { label: "Department", value: "" },
    { label: "College", value: "" },
    { label: "Gender", value: "" },
  ]);
  const [dynamicFields, setDynamicFields] = useState([
    { courseCode: "", courseTitle: "", score: "", grade: "", passFail: "" },
  ]);

  const handleFixedFieldChange = (index, event) => {
    const values = [...fixedFields];
    values[index].value = event.target.value;
    setFixedFields(values);
  };

  const handleDynamicFieldChange = (fieldIndex, fieldKey, event) => {
    const values = [...dynamicFields];
    values[fieldIndex][fieldKey] = event.target.value;
    setDynamicFields(values);
  };

  const handleAddDynamicField = () => {
    setDynamicFields([
      ...dynamicFields,
      { courseCode: "", courseTitle: "", score: "", grade: "", passFail: "" },
    ]);
  };

  const handleRemoveDynamicField = (index) => {
    const values = [...dynamicFields];
    values.splice(index, 1);
    setDynamicFields(values);
  };

  const generateImage = () => {
    html2canvas(document.querySelector("#resume-container")).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "resume.jpg";
      link.click();
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Result Generator</h1>

      <div className="mb-4">
        <h2 className="font-bold mb-2">Student Details</h2>
        {fixedFields.map((field, index) => (
          <div key={index} className="mb-2">
            <label className="mr-2">{field.label}</label>
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder={field.label}
              value={field.value}
              onChange={(event) => handleFixedFieldChange(index, event)}
              ref={(el) => (fixedFieldsRef.current[index] = el)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="font-bold mb-2">Semester Results</h2>
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border py-2 px-4">Course Code</th>
                <th className="border py-2 px-4">Course Title</th>
                <th className="border py-2 px-4">Score</th>
                <th className="border py-2 px-4">Grade</th>
                <th className="border py-2 px-4">Pass/Fail</th>
                <th className="border py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dynamicFields.map((field, index) => (
                <tr key={index}>
                  <td className="border py-2 px-4">
                    <input
                      type="text"
                      className="w-full text-sm"
                      placeholder="Course Code"
                      value={field.courseCode}
                      onChange={(event) =>
                        handleDynamicFieldChange(index, "courseCode", event)
                      }
                      ref={(el) => (dynamicFieldsRef.current[index] = el)}
                    />
                  </td>
                  <td className="border py-2 px-4">
                    <input
                      type="text"
                      className="w-full text-sm"
                      placeholder="Course Title"
                      value={field.courseTitle}
                      onChange={(event) =>
                        handleDynamicFieldChange(index, "courseTitle", event)
                      }
                    />
                  </td>
                  <td className="border py-2 px-4">
                    <input
                      type="text"
                      className="w-full text-sm"
                      placeholder="Score"
                      value={field.score}
                      onChange={(event) =>
                        handleDynamicFieldChange(index, "score", event)
                      }
                    />
                  </td>
                  <td className="border py-2 px-4">
                    <input
                      type="text"
                      className="w-full text-sm"
                      placeholder="Grade"
                      value={field.grade}
                      onChange={(event) =>
                        handleDynamicFieldChange(index, "grade", event)
                      }
                    />
                  </td>
                  <td className="border py-2 px-4">
                    <input
                      type="text"
                      className="w-full text-sm"
                      placeholder="Pass/Fail"
                      value={field.passFail}
                      onChange={(event) =>
                        handleDynamicFieldChange(index, "passFail", event)
                      }
                    />
                  </td>
                  <td className="border py-2 px-4">
                    <button
                      type="button"
                      className="bg-red-500 text-white rounded px-2 py-1"
                      onClick={() => handleRemoveDynamicField(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="bg-green-500 text-white rounded px-2 py-1 mt-2"
          onClick={handleAddDynamicField}
        >
          Add Field
        </button>
      </div>

      <button
        className="bg-blue-500 text-white rounded px-4 py-2"
        onClick={generateImage}
      >
        Download JPG
      </button>

      <div id="resume-container" className="my-4">
        <h1 className="font-black">Veritas Univeristy Abuja</h1>
        <h2 className="font-bold">Student Information</h2>
        {fixedFields.map((field, index) => (
          <div key={index} className="mb-2">
            <label className="mr-2">{field.label}</label>
            <span>{field.value}</span>
          </div>
        ))}

        <h2 className="font-bold mt-4">Academic Results</h2>
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border py-2 px-4">Course Code</th>
                <th className="border py-2 px-4">Course Title</th>
                <th className="border py-2 px-4">Score</th>
                <th className="border py-2 px-4">Grade</th>
                <th className="border py-2 px-4">Pass/Fail</th>
              </tr>
            </thead>
            <tbody>
              {dynamicFields.map((field, index) => (
                <tr key={index}>
                  <td className="border py-2 px-4">{field.courseCode}</td>
                  <td className="border py-2 px-4">{field.courseTitle}</td>
                  <td className="border py-2 px-4">{field.score}</td>
                  <td className="border py-2 px-4">{field.grade}</td>
                  <td className="border py-2 px-4">{field.passFail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResumeMaker;

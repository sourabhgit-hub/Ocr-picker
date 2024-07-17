import React from "react";

const Fields = ({
  formData,
  handleInputChange,
  handleInputFocus,
  handleSubmit,
}) => {
  return (
    <div className="md:w-1/2 pl-4 mt-4 md:mt-0">
      <h2 className="text-2xl font-bold mb-4">Fields</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="type" className="block mb-1">
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("type")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block mb-1">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("amount")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="unit" className="block mb-1">
            Unit:
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("unit")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="financial_year" className="block mb-1">
            Financial Year:
          </label>
          <input
            type="text"
            id="financial_year"
            name="financial_year"
            value={formData.financial_year}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("financial_year")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Fields;

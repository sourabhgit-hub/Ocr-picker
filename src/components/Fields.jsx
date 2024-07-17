import React from "react";

const Fields = ({
  formData,
  handleInputChange,
  handleInputFocus,
  handleSubmit,
  selectedBillType,
}) => {
  return (
    <div className="md:w-1/2 pl-4 mt-4 md:mt-0">
      <h2 className="text-2xl font-bold mb-4">Fields</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="type_of_bill" className="block mb-1">
            Type of Bill:
          </label>
          <input
            type="text"
            id="type_of_bill"
            name="type_of_bill"
            value={selectedBillType}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="bill_parameter_1" className="block mb-1">
            Bill parameter 1:
          </label>
          <input
            type="text"
            id="bill_parameter_1"
            name="bill_parameter_1"
            value={formData.bill_parameter_1}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("bill_parameter_1")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="bill_parameter_2" className="block mb-1">
            Bill parameter 2:
          </label>
          <input
            type="text"
            id="bill_parameter_2"
            name="bill_parameter_2"
            value={formData.bill_parameter_2}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("bill_parameter_2")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="bill_parameter_3" className="block mb-1">
            Bill parameter 3:
          </label>
          <input
            type="text"
            id="bill_parameter_3"
            name="bill_parameter_3"
            value={formData.bill_parameter_3}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("bill_parameter_3")}
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
          <label htmlFor="date" className="block mb-1">
            Date:
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            onFocus={() => handleInputFocus("date")}
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

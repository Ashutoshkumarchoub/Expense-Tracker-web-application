import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import { publicRequest } from "./requestMethods";

// First run cd backend, then nodemon index.js
// then rum cd Backend and then run Backgroundservices
function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [updatedId, setUpdatedId] = useState("");
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get("/expenses");
        setExpenses(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getExpenses();
  }, []);

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };

  const handleShowReport = () => {
    setShowReport(!showReport);
  };

  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdatedId(id);
  };

  const handleUpdateExpense = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/expenses/${updatedId}`, {
          value: updatedAmount,
          label: updatedLabel,
          date: updatedDate,
        });

        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: amount,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateTotalExpense = () => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.value);
    });
    return total.toFixed(2); // Ensure two decimal places for currency
  };

  return (
    <div className="bg-gray-300 min-h-screen relative">
      <div className="flex flex-col justify-center items-center mt-[0%] w-[80%] mr-[5%] ml-[9%]">
        <h1 className="text-2xl font-medium text-[#8b008b]">
          Expense Tracker App by Ashutosh Choubey
        </h1>

        <div className="relative flex items-center justify-between mt-5 w-[100%]">
          <div className="relative flex justify-between w-[300px]">
            <button
              className="bg-[#af8978] p-[10px] border-none outline-none cursor-pointer text-[#ffebcd] text-medium"
              onClick={handleAddExpense}
            >
              Add Expense
            </button>
            <button
              className="bg-[#2f4f4f] p-[10px] border-none outline-none cursor-pointer text-[#ffebcd] text-medium"
              onClick={handleShowReport}
            >
              Expense Report
            </button>
          </div>

          {showAddExpense && (
            <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-0 h-[500px] w-[500px] bg-slate-300 shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red-600 cursor-pointer"
                onClick={handleAddExpense}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Name
              </label>
              <input
                type="text"
                placeholder="eg. Grocery, Foods, Fuels, etc"
                className="outline-none border-2 border-[#000000] border-solid p-[10px] "
                onChange={(e) => setLabel(e.target.value)}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Date
              </label>
              <input
                type="date"
                placeholder="20/05/2024"
                className="outline-none border-2 border-[#000000] border-solid p-[10px] "
                onChange={(e) => setDate(e.target.value)}
              />
              <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
                Expense Amount
              </label>
              <input
                type="Number"
                placeholder="eg. ₹100, ₹500, ₹1000, etc"
                className="outline-none border-2 border-[#000000] border-solid p-[10px] "
                onChange={(e) => setAmount(e.target.value)}
              />

              <button
                className="bg-[#af8978] text-[#000000] p-[10px] border-none cursor-pointer my-[50px]"
                onClick={handleExpense}
              >
                Add Expense
              </button>
            </div>
          )}

          {showReport && (
            <div className="absolute z-[999] flex flex-col p-[10px] top-[20px] left-[100px] h-[500px] w-[500px] bg-slate-300 shadow-xl">
              <FaWindowClose
                className="flex justify-end items-end text-2xl text-red-600 cursor-pointer"
                onClick={handleShowReport}
              />

              <PieChart
                series={[
                  {
                    data: expenses,
                    innerRadius: 30,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -45,
                    endAngle: 225,
                    cx: 150,
                    cy: 150,
                  },
                ]}
              />
              <div className="mt-4 text-lg font-semibold">
                Total Expenses: ₹ {calculateTotalExpense()}
              </div>
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Search🔍"
              className="p-[10px] w-[150px] border-4 border-[#000000] border-solid"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          {filteredExpenses.map((item, index) => (
            <div
              className="relative flex justify-between items-center w-[80vw] h-[100px] bg-[#ffdead] my-[20px] py-[10px] "
              key={index}
            >
              <h2 className="m-[20px] text-[#555] text-[18px] font-medium">
                {item.label}
              </h2>
              <span className="m-[20px] text-[18px] ">{item.date}</span>
              <span className="m-[20px] text-[18px] font-medium">
                ₹ {item.value}
              </span>

              <div className="m-[20px]">
                <FaTrash
                  className="text-red-500 mb-[5px] cursor-pointer"
                  onClick={() => handleDelete(item._id)}
                />
                <FaEdit
                  className="text-[#555] mb-[5px] cursor-pointer"
                  onClick={() => handleShowEdit(item._id)}
                />
              </div>
            </div>
          ))}
        </div>

        {showEdit && (
          <div className="absolute z-[999] flex flex-col p-[10px] top-[20%] right-0 h-[500px] w-[500px] bg-slate-300 shadow-xl">
            <FaWindowClose
              className="flex justify-end items-end text-2xl text-red-600 cursor-pointer"
              onClick={handleShowEdit}
            />
            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Name
            </label>
            <input
              type="text"
              placeholder="eg. Grocery, Foods, Fuels, etc"
              className="outline-none border-2 border-[#000000] border-solid p-[10px] "
              onChange={(e) => setUpdatedLabel(e.target.value)}
            />
            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Date
            </label>
            <input
              type="date"
              placeholder="20/05/2024"
              className="outline-none border-2 border-[#000000] border-solid p-[10px] "
              onChange={(e) => setUpdatedDate(e.target.value)}
            />
            <label htmlFor="" className="mt-[10px] font-semibold text-[18px]">
              Expense Amount
            </label>
            <input
              type="Number"
              placeholder="eg. ₹100, ₹500, ₹1000, etc"
              className="outline-none border-2 border-[#000000] border-solid p-[10px] "
              onChange={(e) => setUpdatedAmount(e.target.value)}
            />

            <button
              className="bg-[#af8978] text-[#000000] p-[10px] border-none cursor-pointer my-[50px]"
              onClick={handleUpdateExpense}
            >
              Update Expense
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

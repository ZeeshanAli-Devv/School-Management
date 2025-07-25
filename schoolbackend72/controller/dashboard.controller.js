const data = {
  studentData  : 75,
  teacherData  : 12,
  employeeData : 13,
  subjectData  : 13,
  classData    : 13,
  paymentData  : 13,
  expenseData  : 13,




  admissionStats: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [300, 200, 100, 600, 500, 200],
    backgroundColors: [
      "rgba(0, 123, 255, 0.7)",
      "rgba(0, 193, 143, 0.7)",
      "rgba(255, 193, 7, 0.7)",
      "rgba(253, 57, 122, 0.7)",
      "rgba(102, 16, 242, 0.7)",
      "rgba(40, 167, 69, 0.7)"
    ]
  },
  paymentStats: {
    labels: ["Paid", "Dues"],
    data: [35000, 12000],
    backgroundColors: ["#00c851", "#ff4444"]
  }
};



export const fetchDashboard = (req, res)=>{
    try {
        res.json(data)
    }
    catch(err)
    {
        res.status(500).json({message: err.message})
    }
}
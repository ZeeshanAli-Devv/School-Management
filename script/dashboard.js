axios.defaults.baseURL = server;

window.onload = async ()=>{
  await getSession()
  await fetchDashboard()
}

// Charts 
document.addEventListener('DOMContentLoaded', function() {
  
  // Revenue vs Expenses Chart
  const ctx = document.getElementById('revenueExpenseChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Revenue',
          data: [45000, 40000, 40000, 60000, 52000, 68000, 72000],
          backgroundColor: '#4f46e5', // indigo-600
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: 'Expenses',
          data: [35000, 40000, 40000, 45000, 40000, 46000, 48000],
          backgroundColor: '#ef4444', // red-500
          borderRadius: 6,
          borderSkipped: false,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
            color: '#e5e7eb',
          },
          ticks: {
            callback: function(value) {
              return '' + (value / 1000) + 'k';
            },
            color: '#6b7280',
          }
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: '#6b7280',
          }
        }
      },
      plugins: {
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
          borderColor: '#374151',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) {
                label += '$' + context.parsed.y.toLocaleString();
              }
              return label;
            }
          }
        },
        legend: {
          display: false
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      }
    }
  });

  // Students by Class Chart
  const ctxx = document.getElementById('classChart').getContext('2d');
  const classLabels = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const studentData = [120, 180, 150, 220, 200];
  
  new Chart(ctxx, {
    type: 'doughnut',
    data: {
      labels: classLabels,
      datasets: [{
        data: studentData,
        backgroundColor: [
          '#4f46e5', // indigo-600
          '#10b981', // emerald-500
          '#f59e0b', // amber-500
          '#ef4444', // red-500
          '#8b5cf6'  // violet-500
        ],
        borderWidth: 0,
        hoverOffset: 12
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        tooltip: {
          backgroundColor: '#1f2937',
          titleColor: '#f9fafb',
          bodyColor: '#f9fafb',
          borderColor: '#374151',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} students (${percentage}%)`;
            }
          }
        },
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 20,
            color: '#6b7280',
            font: {
              size: 11
            }
          }
        }
      },
      layout: {
        padding: {
          top: 20,
          bottom: 20
        }
      }
    }
  });
});

const fetchDashboard = async ()=>{
  try
  {
    const res = await axios.get("/dashboard", getServerSession())
    console.log(res.data)

    const studentData  = document.getElementById("student")
    const teacherData  = document.getElementById("teacher")
    const employeeData = document.getElementById("employee")
    const subjectData  = document.getElementById("subject")
    const classData    = document.getElementById("class")
    const paymentData  = document.getElementById("payment")
    const expenseData  = document.getElementById("expense")

    studentData.innerHTML = res.data.studentData
    teacherData.innerHTML = res.data.teacherData
    employeeData.innerHTML= res.data.employeeData
    subjectData.innerHTML = res.data.subjectData
    classData.innerHTML   = res.data.classData
    paymentData.innerHTML = res.data.paymentData
    expenseData.innerHTML = res.data.expenseData
  }
  catch(err)
  {
    console.log(err.response ? err.response.data.message : err.message);
  }
}
import { useState , useEffect} from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: ''
  })
  const [submittedData, setSubmittedData] = useState([])
  const [currentPage, setCurrentPage] = useState('form')

  useEffect(() => {
    // Trigger page browse event on page load
    if (window.smartech) {
      window.smartech('dispatch', 'page browse', {})
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Add submitted data to table
    setSubmittedData(prev => [...prev, { ...formData }])
    
    // Trigger Smartech contact event with form data
    if (window.smartech) {
      window.smartech('contact', '1', {
        'pk^email': formData.email,
        'mobile': formData.mobile,
        'fullName': formData.fullName
      })
    }

    // Reset form
    setFormData({
      fullName: '',
      email: '',
      mobile: ''
    })

    
    setCurrentPage('data')
  }

  const goBackToForm = () => {
    setCurrentPage('form')
  }

  if (currentPage === 'data') {
    return (
      <div className="container">
        <div className="table-container">
          <h1>Submitted Data</h1>
          <table className="data-table">
            <thead>
              <tr>
                <th>fullName</th>
                <th>Mail ID</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{data.fullName}</td>
                  <td>{data.email}</td>
                  <td>{data.mobile}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={goBackToForm} className="back-btn">Back to Form</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="fullName">fullName:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Enter your fullName"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Mail ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your mail id"
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="Enter your mobile number"
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  )
}

export default App
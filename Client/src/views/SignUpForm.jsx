import { useState } from 'react'
import api from '../api.js'
import './AuthForms.css'

export default function SignUpForm({ onAuthSuccess }) {
  const [form, setForm] = useState({
    email: '', confirmEmail: '', password: '', name: '', dob: '', gender: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (isSubmitting) return
    setErrorMessage('')
    setSuccessMessage('')

    if (form.email !== form.confirmEmail) {
      setErrorMessage('Emails do not match')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await api.post('/api/signup', form)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      setSuccessMessage('Account created! Redirecting...')
      await onAuthSuccess()
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Error creating account')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Sign Up for MusicApp</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="confirmEmail">Confirm Email</label>
            <input id="confirmEmail" name="confirmEmail" type="email" value={form.confirmEmail} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input id="dob" name="dob" type="date" value={form.dob} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={form.gender} onChange={handleChange} required>
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  )
}

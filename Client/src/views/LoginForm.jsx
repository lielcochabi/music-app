import { useState } from 'react'
import api from '../api.js'
import './AuthForms.css'

export default function LoginForm({ onChangeTab, onAuthSuccess }) {
  const [form, setForm] = useState({ name: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (isSubmitting) return
    setIsSubmitting(true)
    setErrorMessage('')
    try {
      const response = await api.post('/api/login', form)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('token', response.data.token)
      onChangeTab('Home')
      await onAuthSuccess()
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Invalid username or password')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login to MusicApp</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Username</label>
            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} required />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

import { Link } from 'react-router'

export default function Index() {
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Calendar</h1>
      <p>Welcome to the calendar app!</p>
      <nav>
        <h2>Quick Links:</h2>
        <ul>
          <li>
            <Link to={`/${yesterday}`}>Yesterday ({yesterday})</Link>
          </li>
          <li>
            <Link to={`/${today}`}>Today ({today})</Link>
          </li>
          <li>
            <Link to={`/${tomorrow}`}>Tomorrow ({tomorrow})</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

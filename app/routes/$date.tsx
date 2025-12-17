import { useParams, Link } from 'react-router'

export function meta({ params }: { params: { date: string } }) {
  return [
    { title: `Calendar - ${params.date}` },
    { name: 'description', content: `Calendar page for ${params.date}` },
  ]
}

export default function DatePage() {
  const { date } = useParams()

  // Parse the date
  let formattedDate = ''
  let isValidDate = false
  try {
    const dateObj = new Date(date + 'T00:00:00')
    if (!isNaN(dateObj.getTime())) {
      isValidDate = true
      formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }
  } catch (e) {
    // Invalid date
  }

  // Calculate previous and next dates
  let prevDate = ''
  let nextDate = ''
  if (isValidDate) {
    const dateObj = new Date(date + 'T00:00:00')
    const prev = new Date(dateObj.getTime() - 86400000)
    const next = new Date(dateObj.getTime() + 86400000)
    prevDate = prev.toISOString().split('T')[0]
    nextDate = next.toISOString().split('T')[0]
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <Link to="/">← Back to Home</Link>
      </nav>

      {isValidDate ? (
        <>
          <h1>{formattedDate}</h1>
          <p>Date: {date}</p>

          <nav style={{ marginTop: '2rem' }}>
            <h2>Navigation:</h2>
            <ul>
              <li>
                <Link to={`/${prevDate}`}>← Previous Day ({prevDate})</Link>
              </li>
              <li>
                <Link to={`/${nextDate}`}>Next Day ({nextDate}) →</Link>
              </li>
            </ul>
          </nav>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
            <h3>Events for {formattedDate}</h3>
            <p>No events scheduled for this date.</p>
          </div>
        </>
      ) : (
        <>
          <h1>Invalid Date</h1>
          <p>The date "{date}" is not a valid date format. Please use YYYY-MM-DD format.</p>
          <Link to="/">Go to Home</Link>
        </>
      )}
    </div>
  )
}

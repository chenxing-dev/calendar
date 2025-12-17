import { useParams, Link } from 'react-router'

export function meta({ params }: { params: { date: string } }) {
  return [
    { title: `Calendar - ${params.date}` },
    { name: 'description', content: `Calendar page for ${params.date}` },
  ]
}

// Helper function to safely parse date strings in YYYY-MM-DD format
function parseDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  
  // Validate YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) return null;
  
  // Parse as ISO date at midnight UTC to avoid timezone issues
  const date = new Date(dateStr + 'T00:00:00');
  
  // Check if date is valid
  if (isNaN(date.getTime())) return null;
  
  return date;
}

// Helper function to format date for display
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Helper function to get date string in YYYY-MM-DD format
function getDateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

export default function DatePage() {
  const { date } = useParams()

  // Parse and validate the date
  const dateObj = parseDate(date);
  const isValidDate = dateObj !== null;
  
  let formattedDate = '';
  let prevDate = '';
  let nextDate = '';
  
  if (isValidDate && dateObj) {
    formattedDate = formatDate(dateObj);
    
    // Calculate previous and next dates
    const prev = new Date(dateObj.getTime() - 86400000); // Subtract 1 day in milliseconds
    const next = new Date(dateObj.getTime() + 86400000); // Add 1 day in milliseconds
    
    prevDate = getDateString(prev);
    nextDate = getDateString(next);
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

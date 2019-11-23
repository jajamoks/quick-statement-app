import Papa from 'papaparse'
import md5 from 'md5'

export default function(csvData) {
  // Parse CSV data file to rows and columns
  const csv = Papa.parse(csvData)

  // Filter header, footer and income lines from statement
  const statement = csv.data.filter(
    (row) =>
      row.length > 4 &&
      !(
        [
          'Paaiškinimai',
          'Likutis pradžiai',
          'Apyvarta',
          'Likutis pabaigai'
        ].includes(row[4]) || row[3] === 'REMIGIJUS JARMALAVIČIUS'
      )
  )

  // Construct reusable format for data handling
  return statement.map((entry) => {
    const date = entry[2]
    let title
    if (entry[4]) {
      title = entry[4]
      if (!title.includes(entry[3])) {
        title += ' | ' + entry[3]
      }
    } else {
      title = entry[3]
    }
    const amount = entry[5]
    const type = entry[7] === 'D' ? 'expense' : 'income'
    const id = md5(date + title + amount)
    return {
      id,
      date,
      title,
      amount,
      type,
      category: null
    }
  }, {})
}

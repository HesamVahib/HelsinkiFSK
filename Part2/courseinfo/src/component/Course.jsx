const Course = ({course}) => {
    return (
      <div>
      <h2>{course.name}
      </h2>
      {course.parts.map(part =>
        <p key={part.id}>{part.name} {part.exercises}</p>
      )}
    <p> <b>total of {course.parts.reduce((accumulator,sumcourses ) =>
        accumulator + sumcourses.exercises, 0) } exercies</b></p>
      </div>
    )
  }

export default Course
import Display from './Display';

const Course = ({course}) => {
    return (
      <div>
      <Display tag="h2" text={course.name} />
      {course.parts.map(part =>
        <Display key={part.id} tag="p" text={part.name} />
      )}
        <Display tag="b" text={`Total of ${course.parts.reduce((sum, part) => sum + part.exercises, 0)} exercises`} />
      </div>
    )
  }

  export default Course;
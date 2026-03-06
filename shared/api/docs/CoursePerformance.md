
# CoursePerformance


## Properties

Name | Type
------------ | -------------
`courseId` | string
`courseName` | string
`students` | number
`revenue` | number
`rating` | number
`status` | [CourseStatus](CourseStatus.md)

## Example

```typescript
import type { CoursePerformance } from ''

// TODO: Update the object below with actual values
const example = {
  "courseId": null,
  "courseName": null,
  "students": null,
  "revenue": null,
  "rating": null,
  "status": null,
} satisfies CoursePerformance

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as CoursePerformance
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



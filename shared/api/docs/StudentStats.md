
# StudentStats


## Properties

Name | Type
------------ | -------------
`activeCoursesCount` | number
`completedCoursesCount` | number
`certificatesEarned` | number
`totalHoursLearning` | number
`averageScore` | number
`learningStreakDays` | number

## Example

```typescript
import type { StudentStats } from ''

// TODO: Update the object below with actual values
const example = {
  "activeCoursesCount": null,
  "completedCoursesCount": null,
  "certificatesEarned": null,
  "totalHoursLearning": null,
  "averageScore": null,
  "learningStreakDays": null,
} satisfies StudentStats

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as StudentStats
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



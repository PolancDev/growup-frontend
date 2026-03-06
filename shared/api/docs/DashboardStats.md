
# DashboardStats


## Properties

Name | Type
------------ | -------------
`totalStudents` | number
`activeCourses` | number
`averageRating` | number
`monthlyRevenue` | number
`studentsGrowth` | number
`revenueGrowth` | number

## Example

```typescript
import type { DashboardStats } from ''

// TODO: Update the object below with actual values
const example = {
  "totalStudents": null,
  "activeCourses": null,
  "averageRating": null,
  "monthlyRevenue": null,
  "studentsGrowth": null,
  "revenueGrowth": null,
} satisfies DashboardStats

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as DashboardStats
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



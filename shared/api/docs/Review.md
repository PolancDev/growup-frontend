
# Review


## Properties

Name | Type
------------ | -------------
`id` | string
`courseId` | string
`courseName` | string
`studentId` | string
`studentName` | string
`rating` | number
`comment` | string
`createdAt` | Date
`version` | number

## Example

```typescript
import type { Review } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "courseId": null,
  "courseName": null,
  "studentId": null,
  "studentName": null,
  "rating": null,
  "comment": null,
  "createdAt": null,
  "version": null,
} satisfies Review

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Review
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# Course


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`description` | string
`imageUrl` | string
`category` | string
`level` | [CourseLevel](CourseLevel.md)
`price` | number
`duration` | number
`startDate` | Date
`endDate` | Date
`publicationStatus` | [CourseStatus](CourseStatus.md)
`createdAt` | Date
`updatedAt` | Date
`deletedAt` | Date
`instructor` | [Instructor](Instructor.md)
`syllabus` | [Array&lt;Syllabus&gt;](Syllabus.md)
`enrolledCount` | number
`version` | number

## Example

```typescript
import type { Course } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "description": null,
  "imageUrl": null,
  "category": null,
  "level": null,
  "price": null,
  "duration": null,
  "startDate": null,
  "endDate": null,
  "publicationStatus": null,
  "createdAt": null,
  "updatedAt": null,
  "deletedAt": null,
  "instructor": null,
  "syllabus": null,
  "enrolledCount": null,
  "version": null,
} satisfies Course

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Course
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



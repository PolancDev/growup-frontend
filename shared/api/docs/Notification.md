
# Notification


## Properties

Name | Type
------------ | -------------
`id` | string
`userId` | string
`title` | string
`message` | string
`date` | Date
`read` | boolean
`type` | [NotificationType](NotificationType.md)
`link` | string

## Example

```typescript
import type { Notification } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "userId": null,
  "title": null,
  "message": null,
  "date": null,
  "read": null,
  "type": null,
  "link": null,
} satisfies Notification

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as Notification
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)




# User


## Properties

Name | Type
------------ | -------------
`id` | string
`name` | string
`email` | string
`isActive` | boolean
`role` | [Role](Role.md)
`avatar` | string
`joinDate` | Date
`bio` | string
`version` | number

## Example

```typescript
import type { User } from ''

// TODO: Update the object below with actual values
const example = {
  "id": null,
  "name": null,
  "email": null,
  "isActive": null,
  "role": null,
  "avatar": null,
  "joinDate": null,
  "bio": null,
  "version": null,
} satisfies User

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as User
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



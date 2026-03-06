
# UpdateUserRequest


## Properties

Name | Type
------------ | -------------
`name` | string
`email` | string
`avatar` | string
`bio` | string
`password` | string
`version` | number

## Example

```typescript
import type { UpdateUserRequest } from ''

// TODO: Update the object below with actual values
const example = {
  "name": null,
  "email": null,
  "avatar": null,
  "bio": null,
  "password": null,
  "version": null,
} satisfies UpdateUserRequest

console.log(example)

// Convert the instance to a JSON string
const exampleJSON: string = JSON.stringify(example)
console.log(exampleJSON)

// Parse the JSON string back to an object
const exampleParsed = JSON.parse(exampleJSON) as UpdateUserRequest
console.log(exampleParsed)
```

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)



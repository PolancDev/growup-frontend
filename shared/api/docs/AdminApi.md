# AdminApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**adminUsersGet**](AdminApi.md#adminusersget) | **GET** /admin/users | Listar todos los usuarios |
| [**adminUsersIdGet**](AdminApi.md#adminusersidget) | **GET** /admin/users/{id} | Obtener detalles de usuario (Admin) |
| [**adminUsersIdPut**](AdminApi.md#adminusersidput) | **PUT** /admin/users/{id} | Modificar usuario (Admin) |
| [**adminUsersIdStatusPatch**](AdminApi.md#adminusersidstatuspatchoperation) | **PATCH** /admin/users/{id}/status | Cambiar estado de usuario (Alta/Baja Lógica) |



## adminUsersGet

> Array&lt;User&gt; adminUsersGet(role, isActive)

Listar todos los usuarios

Obtener lista paginada de usuarios (Solo ADMIN)

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminUsersGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // Role | Filtrar por rol (optional)
    role: ...,
    // boolean | Filtrar por estado (activo/inactivo) (optional)
    isActive: true,
  } satisfies AdminUsersGetRequest;

  try {
    const data = await api.adminUsersGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **role** | `Role` | Filtrar por rol | [Optional] [Defaults to `undefined`] [Enum: ADMIN, TEACHER, STUDENT] |
| **isActive** | `boolean` | Filtrar por estado (activo/inactivo) | [Optional] [Defaults to `undefined`] |

### Return type

[**Array&lt;User&gt;**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de usuarios |  -  |
| **403** | No autorizado (requiere rol ADMIN) |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## adminUsersIdGet

> User adminUsersIdGet(id)

Obtener detalles de usuario (Admin)

Obtener información completa de cualquier usuario por ID

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminUsersIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // string | ID del usuario
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies AdminUsersIdGetRequest;

  try {
    const data = await api.adminUsersIdGet(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | ID del usuario | [Defaults to `undefined`] |

### Return type

[**User**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Detalles del usuario |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## adminUsersIdPut

> User adminUsersIdPut(id, user)

Modificar usuario (Admin)

Modificar datos de cualquier usuario (incluyendo rol)

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminUsersIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // string | ID del usuario
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // User
    user: ...,
  } satisfies AdminUsersIdPutRequest;

  try {
    const data = await api.adminUsersIdPut(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | ID del usuario | [Defaults to `undefined`] |
| **user** | [User](User.md) |  | |

### Return type

[**User**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Usuario modificado exitosamente |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## adminUsersIdStatusPatch

> User adminUsersIdStatusPatch(id, adminUsersIdStatusPatchRequest)

Cambiar estado de usuario (Alta/Baja Lógica)

Activar o desactivar un usuario sin eliminarlo de la base de datos

### Example

```ts
import {
  Configuration,
  AdminApi,
} from '';
import type { AdminUsersIdStatusPatchOperationRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AdminApi(config);

  const body = {
    // string | ID del usuario
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // AdminUsersIdStatusPatchRequest
    adminUsersIdStatusPatchRequest: ...,
  } satisfies AdminUsersIdStatusPatchOperationRequest;

  try {
    const data = await api.adminUsersIdStatusPatch(body);
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters


| Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **id** | `string` | ID del usuario | [Defaults to `undefined`] |
| **adminUsersIdStatusPatchRequest** | [AdminUsersIdStatusPatchRequest](AdminUsersIdStatusPatchRequest.md) |  | |

### Return type

[**User**](User.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Estado del usuario actualizado |  -  |
| **404** | Usuario no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


# AutenticacinApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**authLoginPost**](AutenticacinApi.md#authloginpost) | **POST** /auth/login | Iniciar sesión |
| [**authMeGet**](AutenticacinApi.md#authmeget) | **GET** /auth/me | Obtener usuario actual |
| [**authMePut**](AutenticacinApi.md#authmeput) | **PUT** /auth/me | Actualizar perfil propio |
| [**authRegisterPost**](AutenticacinApi.md#authregisterpost) | **POST** /auth/register | Registrar nuevo usuario |



## authLoginPost

> AuthResponse authLoginPost(loginRequest)

Iniciar sesión

Autenticar usuario con email y contraseña

### Example

```ts
import {
  Configuration,
  AutenticacinApi,
} from '';
import type { AuthLoginPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AutenticacinApi();

  const body = {
    // LoginRequest
    loginRequest: ...,
  } satisfies AuthLoginPostRequest;

  try {
    const data = await api.authLoginPost(body);
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
| **loginRequest** | [LoginRequest](LoginRequest.md) |  | |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Inicio de sesión exitoso |  -  |
| **401** | Credenciales inválidas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authMeGet

> User authMeGet()

Obtener usuario actual

Obtener información del usuario autenticado

### Example

```ts
import {
  Configuration,
  AutenticacinApi,
} from '';
import type { AuthMeGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AutenticacinApi(config);

  try {
    const data = await api.authMeGet();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Run the test
example().catch(console.error);
```

### Parameters

This endpoint does not need any parameter.

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
| **200** | Información del usuario actual |  -  |
| **401** | No autenticado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authMePut

> User authMePut(updateUserRequest)

Actualizar perfil propio

Actualizar nombre, bio, avatar o contraseña del usuario autenticado

### Example

```ts
import {
  Configuration,
  AutenticacinApi,
} from '';
import type { AuthMePutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new AutenticacinApi(config);

  const body = {
    // UpdateUserRequest
    updateUserRequest: ...,
  } satisfies AuthMePutRequest;

  try {
    const data = await api.authMePut(body);
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
| **updateUserRequest** | [UpdateUserRequest](UpdateUserRequest.md) |  | |

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
| **200** | Perfil actualizado exitosamente |  -  |
| **400** | Datos inválidos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## authRegisterPost

> AuthResponse authRegisterPost(registerRequest)

Registrar nuevo usuario

Crear una nueva cuenta de usuario

### Example

```ts
import {
  Configuration,
  AutenticacinApi,
} from '';
import type { AuthRegisterPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new AutenticacinApi();

  const body = {
    // RegisterRequest
    registerRequest: ...,
  } satisfies AuthRegisterPostRequest;

  try {
    const data = await api.authRegisterPost(body);
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
| **registerRequest** | [RegisterRequest](RegisterRequest.md) |  | |

### Return type

[**AuthResponse**](AuthResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Usuario creado exitosamente |  -  |
| **400** | Datos inválidos o email ya registrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


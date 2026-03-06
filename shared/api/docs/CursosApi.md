# CursosApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**coursesGet**](CursosApi.md#coursesget) | **GET** /courses | Listar cursos |
| [**coursesIdDelete**](CursosApi.md#coursesiddelete) | **DELETE** /courses/{id} | Eliminar curso |
| [**coursesIdGet**](CursosApi.md#coursesidget) | **GET** /courses/{id} | Obtener detalles del curso |
| [**coursesIdPut**](CursosApi.md#coursesidput) | **PUT** /courses/{id} | Actualizar curso |
| [**coursesIdSyllabusGet**](CursosApi.md#coursesidsyllabusget) | **GET** /courses/{id}/syllabus | Obtener temario del curso |
| [**coursesPost**](CursosApi.md#coursespost) | **POST** /courses | Crear curso |



## coursesGet

> Array&lt;Course&gt; coursesGet(category, level, status)

Listar cursos

Obtener lista de cursos con filtros opcionales

### Example

```ts
import {
  Configuration,
  CursosApi,
} from '';
import type { CoursesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CursosApi(config);

  const body = {
    // string | Filtrar por categoría (optional)
    category: category_example,
    // CourseLevel | Filtrar por nivel (optional)
    level: ...,
    // CourseStatus | Filtrar por estado de publicación (optional)
    status: ...,
  } satisfies CoursesGetRequest;

  try {
    const data = await api.coursesGet(body);
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
| **category** | `string` | Filtrar por categoría | [Optional] [Defaults to `undefined`] |
| **level** | `CourseLevel` | Filtrar por nivel | [Optional] [Defaults to `undefined`] [Enum: Principiante, Intermedio, Avanzado] |
| **status** | `CourseStatus` | Filtrar por estado de publicación | [Optional] [Defaults to `undefined`] [Enum: Publicado, Borrador, En Revision] |

### Return type

[**Array&lt;Course&gt;**](Course.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de cursos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## coursesIdDelete

> coursesIdDelete(id)

Eliminar curso

Eliminar un curso (soft delete)

### Example

```ts
import {
  Configuration,
  CursosApi,
} from '';
import type { CoursesIdDeleteRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CursosApi(config);

  const body = {
    // string | ID del curso
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CoursesIdDeleteRequest;

  try {
    const data = await api.coursesIdDelete(body);
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
| **id** | `string` | ID del curso | [Defaults to `undefined`] |

### Return type

`void` (Empty response body)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **204** | Curso eliminado exitosamente |  -  |
| **404** | Curso no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## coursesIdGet

> Course coursesIdGet(id)

Obtener detalles del curso

Obtener información completa de un curso

### Example

```ts
import {
  Configuration,
  CursosApi,
} from '';
import type { CoursesIdGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CursosApi();

  const body = {
    // string | ID del curso
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CoursesIdGetRequest;

  try {
    const data = await api.coursesIdGet(body);
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
| **id** | `string` | ID del curso | [Defaults to `undefined`] |

### Return type

[**Course**](Course.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Detalles del curso |  -  |
| **404** | Curso no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## coursesIdPut

> Course coursesIdPut(id, course)

Actualizar curso

Actualizar información de un curso

### Example

```ts
import {
  Configuration,
  CursosApi,
} from '';
import type { CoursesIdPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CursosApi(config);

  const body = {
    // string | ID del curso
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // Course
    course: ...,
  } satisfies CoursesIdPutRequest;

  try {
    const data = await api.coursesIdPut(body);
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
| **id** | `string` | ID del curso | [Defaults to `undefined`] |
| **course** | [Course](Course.md) |  | |

### Return type

[**Course**](Course.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Curso actualizado exitosamente |  -  |
| **404** | Curso no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## coursesIdSyllabusGet

> Array&lt;Syllabus&gt; coursesIdSyllabusGet(id)

Obtener temario del curso

Obtener el temario completo del curso

### Example

```ts
import {
  Configuration,
  CursosApi,
} from '';
import type { CoursesIdSyllabusGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const api = new CursosApi();

  const body = {
    // string | ID del curso
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CoursesIdSyllabusGetRequest;

  try {
    const data = await api.coursesIdSyllabusGet(body);
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
| **id** | `string` | ID del curso | [Defaults to `undefined`] |

### Return type

[**Array&lt;Syllabus&gt;**](Syllabus.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Temario del curso |  -  |
| **404** | Curso no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## coursesPost

> Course coursesPost(course)

Crear curso

Crear un nuevo curso (requiere rol TEACHER o ADMIN)

### Example

```ts
import {
  Configuration,
  CursosApi,
} from '';
import type { CoursesPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new CursosApi(config);

  const body = {
    // Course
    course: ...,
  } satisfies CoursesPostRequest;

  try {
    const data = await api.coursesPost(body);
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
| **course** | [Course](Course.md) |  | |

### Return type

[**Course**](Course.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Curso creado exitosamente |  -  |
| **403** | No autorizado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


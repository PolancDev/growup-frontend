# EstudianteApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**coursesIdEnrollPost**](EstudianteApi.md#coursesidenrollpost) | **POST** /courses/{id}/enroll | Inscribirse en un curso |
| [**coursesIdEnrolledGet**](EstudianteApi.md#coursesidenrolledget) | **GET** /courses/{id}/enrolled | Verificar inscripción en un curso |
| [**coursesIdReviewsPost**](EstudianteApi.md#coursesidreviewspost) | **POST** /courses/{id}/reviews | Valorar un curso |
| [**studentCatalogGet**](EstudianteApi.md#studentcatalogget) | **GET** /student/catalog | Catálogo de cursos para estudiantes |
| [**studentEnrollmentsGet**](EstudianteApi.md#studentenrollmentsget) | **GET** /student/enrollments | Obtener mis inscripciones |
| [**studentNotificationsGet**](EstudianteApi.md#studentnotificationsget) | **GET** /student/notifications | Obtener notificaciones |
| [**studentNotificationsIdReadPut**](EstudianteApi.md#studentnotificationsidreadput) | **PUT** /student/notifications/{id}/read | Marcar notificación como leída |
| [**studentStatsGet**](EstudianteApi.md#studentstatsget) | **GET** /student/stats | Obtener estadísticas del estudiante |



## coursesIdEnrollPost

> EnrolledCourse coursesIdEnrollPost(id)

Inscribirse en un curso

Inscribir al estudiante autenticado en un curso

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { CoursesIdEnrollPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  const body = {
    // string | ID del curso
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CoursesIdEnrollPostRequest;

  try {
    const data = await api.coursesIdEnrollPost(body);
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

[**EnrolledCourse**](EnrolledCourse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Inscripción exitosa |  -  |
| **404** | Curso no encontrado |  -  |
| **409** | Ya inscrito en el curso |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## coursesIdEnrolledGet

> boolean coursesIdEnrolledGet(id)

Verificar inscripción en un curso

Verifica si el estudiante autenticado está inscrito en un curso

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { CoursesIdEnrolledGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  const body = {
    // string | ID del curso
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies CoursesIdEnrolledGetRequest;

  try {
    const data = await api.coursesIdEnrolledGet(body);
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

**boolean**

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Estado de inscripción |  -  |
| **404** | Curso no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## coursesIdReviewsPost

> Review coursesIdReviewsPost(id, review)

Valorar un curso

Crear una nueva reseña para un curso en el que el estudiante está inscrito

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { CoursesIdReviewsPostRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  const body = {
    // string | ID del curso a valorar
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
    // Review
    review: ...,
  } satisfies CoursesIdReviewsPostRequest;

  try {
    const data = await api.coursesIdReviewsPost(body);
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
| **id** | `string` | ID del curso a valorar | [Defaults to `undefined`] |
| **review** | [Review](Review.md) |  | |

### Return type

[**Review**](Review.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: `application/json`
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **201** | Reseña creada exitosamente |  -  |
| **400** | Datos inválidos o estudiante no inscrito |  -  |
| **404** | Curso no encontrado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## studentCatalogGet

> Array&lt;Course&gt; studentCatalogGet(category, level, status)

Catálogo de cursos para estudiantes

Obtener el catálogo completo de cursos disponibles en la plataforma para el estudiante autenticado. Admite filtros opcionales por categoría, nivel y estado de publicación.

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { StudentCatalogGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  const body = {
    // string | Filtrar por categoría (optional)
    category: category_example,
    // CourseLevel | Filtrar por nivel (optional)
    level: ...,
    // CourseStatus | Filtrar por estado de publicación (optional)
    status: ...,
  } satisfies StudentCatalogGetRequest;

  try {
    const data = await api.studentCatalogGet(body);
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
| **200** | Lista de cursos disponibles |  -  |
| **401** | No autenticado |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## studentEnrollmentsGet

> Array&lt;EnrolledCourse&gt; studentEnrollmentsGet()

Obtener mis inscripciones

Obtener lista de cursos en los que está inscrito el estudiante

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { StudentEnrollmentsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  try {
    const data = await api.studentEnrollmentsGet();
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

[**Array&lt;EnrolledCourse&gt;**](EnrolledCourse.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de cursos inscritos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## studentNotificationsGet

> Array&lt;Notification&gt; studentNotificationsGet(unreadOnly)

Obtener notificaciones

Obtener lista de notificaciones del estudiante

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { StudentNotificationsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  const body = {
    // boolean | Mostrar solo notificaciones no leídas (optional)
    unreadOnly: true,
  } satisfies StudentNotificationsGetRequest;

  try {
    const data = await api.studentNotificationsGet(body);
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
| **unreadOnly** | `boolean` | Mostrar solo notificaciones no leídas | [Optional] [Defaults to `false`] |

### Return type

[**Array&lt;Notification&gt;**](Notification.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de notificaciones |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## studentNotificationsIdReadPut

> studentNotificationsIdReadPut(id)

Marcar notificación como leída

Marcar una notificación específica como leída

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { StudentNotificationsIdReadPutRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  const body = {
    // string | ID de la notificación
    id: 38400000-8cf0-11bd-b23e-10b96e4ef00d,
  } satisfies StudentNotificationsIdReadPutRequest;

  try {
    const data = await api.studentNotificationsIdReadPut(body);
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
| **id** | `string` | ID de la notificación | [Defaults to `undefined`] |

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
| **200** | Notificación marcada como leída |  -  |
| **404** | Notificación no encontrada |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## studentStatsGet

> StudentStats studentStatsGet()

Obtener estadísticas del estudiante

Obtener estadísticas de aprendizaje del estudiante autenticado

### Example

```ts
import {
  Configuration,
  EstudianteApi,
} from '';
import type { StudentStatsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new EstudianteApi(config);

  try {
    const data = await api.studentStatsGet();
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

[**StudentStats**](StudentStats.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Estadísticas del estudiante |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


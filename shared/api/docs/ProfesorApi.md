# ProfesorApi

All URIs are relative to *http://localhost:8080/api/v1*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**teacherActivitiesGet**](ProfesorApi.md#teacheractivitiesget) | **GET** /teacher/activities | Obtener actividades recientes |
| [**teacherAnalyticsCoursesGet**](ProfesorApi.md#teacheranalyticscoursesget) | **GET** /teacher/analytics/courses | Obtener rendimiento de cursos |
| [**teacherAnalyticsRevenueGet**](ProfesorApi.md#teacheranalyticsrevenueget) | **GET** /teacher/analytics/revenue | Obtener análisis de ingresos |
| [**teacherAnalyticsSummaryGet**](ProfesorApi.md#teacheranalyticssummaryget) | **GET** /teacher/analytics/summary | Obtener resumen de analíticas |
| [**teacherCoursesGet**](ProfesorApi.md#teachercoursesget) | **GET** /teacher/courses | Obtener mis cursos |
| [**teacherDashboardStatsGet**](ProfesorApi.md#teacherdashboardstatsget) | **GET** /teacher/dashboard/stats | Obtener estadísticas del panel |
| [**teacherReviewsGet**](ProfesorApi.md#teacherreviewsget) | **GET** /teacher/reviews | Obtener reseñas de mis cursos |



## teacherActivitiesGet

> Array&lt;Activity&gt; teacherActivitiesGet(limit)

Obtener actividades recientes

Obtener lista de actividades recientes en los cursos del profesor

### Example

```ts
import {
  Configuration,
  ProfesorApi,
} from '';
import type { TeacherActivitiesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProfesorApi(config);

  const body = {
    // number | Número máximo de actividades a retornar (optional)
    limit: 56,
  } satisfies TeacherActivitiesGetRequest;

  try {
    const data = await api.teacherActivitiesGet(body);
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
| **limit** | `number` | Número máximo de actividades a retornar | [Optional] [Defaults to `10`] |

### Return type

[**Array&lt;Activity&gt;**](Activity.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Actividades recientes |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teacherAnalyticsCoursesGet

> Array&lt;CoursePerformance&gt; teacherAnalyticsCoursesGet()

Obtener rendimiento de cursos

Obtener análisis de rendimiento de los cursos del profesor

### Example

```ts
import {
  Configuration,
  ProfesorApi,
} from '';
import type { TeacherAnalyticsCoursesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProfesorApi(config);

  try {
    const data = await api.teacherAnalyticsCoursesGet();
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

[**Array&lt;CoursePerformance&gt;**](CoursePerformance.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Rendimiento de cursos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teacherAnalyticsRevenueGet

> Array&lt;RevenueData&gt; teacherAnalyticsRevenueGet(months)

Obtener análisis de ingresos

Obtener datos de ingresos mensuales del profesor

### Example

```ts
import {
  Configuration,
  ProfesorApi,
} from '';
import type { TeacherAnalyticsRevenueGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProfesorApi(config);

  const body = {
    // number | Número de meses a consultar (optional)
    months: 56,
  } satisfies TeacherAnalyticsRevenueGetRequest;

  try {
    const data = await api.teacherAnalyticsRevenueGet(body);
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
| **months** | `number` | Número de meses a consultar | [Optional] [Defaults to `12`] |

### Return type

[**Array&lt;RevenueData&gt;**](RevenueData.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Datos de ingresos |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teacherAnalyticsSummaryGet

> AnalyticsSummary teacherAnalyticsSummaryGet()

Obtener resumen de analíticas

Obtener resumen global de analíticas del profesor

### Example

```ts
import {
  Configuration,
  ProfesorApi,
} from '';
import type { TeacherAnalyticsSummaryGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProfesorApi(config);

  try {
    const data = await api.teacherAnalyticsSummaryGet();
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

[**AnalyticsSummary**](AnalyticsSummary.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Resumen de analíticas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teacherCoursesGet

> Array&lt;CourseItem&gt; teacherCoursesGet()

Obtener mis cursos

Obtener lista de cursos del profesor autenticado con estadísticas

### Example

```ts
import {
  Configuration,
  ProfesorApi,
} from '';
import type { TeacherCoursesGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProfesorApi(config);

  try {
    const data = await api.teacherCoursesGet();
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

[**Array&lt;CourseItem&gt;**](CourseItem.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de cursos del profesor |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teacherDashboardStatsGet

> DashboardStats teacherDashboardStatsGet()

Obtener estadísticas del panel

Obtener resumen de estadísticas para el panel del profesor

### Example

```ts
import {
  Configuration,
  ProfesorApi,
} from '';
import type { TeacherDashboardStatsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProfesorApi(config);

  try {
    const data = await api.teacherDashboardStatsGet();
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

[**DashboardStats**](DashboardStats.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Estadísticas del panel |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)


## teacherReviewsGet

> Array&lt;Review&gt; teacherReviewsGet()

Obtener reseñas de mis cursos

Obtener lista de todas las reseñas dejadas en los cursos del profesor

### Example

```ts
import {
  Configuration,
  ProfesorApi,
} from '';
import type { TeacherReviewsGetRequest } from '';

async function example() {
  console.log("🚀 Testing  SDK...");
  const config = new Configuration({ 
    // Configure HTTP bearer authorization: BearerAuth
    accessToken: "YOUR BEARER TOKEN",
  });
  const api = new ProfesorApi(config);

  try {
    const data = await api.teacherReviewsGet();
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

[**Array&lt;Review&gt;**](Review.md)

### Authorization

[BearerAuth](../README.md#BearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: `application/json`


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | Lista de reseñas |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#api-endpoints) [[Back to Model list]](../README.md#models) [[Back to README]](../README.md)

